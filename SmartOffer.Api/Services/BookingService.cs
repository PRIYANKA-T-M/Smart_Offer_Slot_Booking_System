using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOffer.Api.BusinessRules;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Services
{
    public interface IBookingService
    {
        Task<string?> CreateBookingAsync(BookingRequest request, Guid customerId);
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<Booking?> GetBookingByIdAsync(Guid id);
        Task<bool> UpdateBookingStatusAsync(Guid id, BookingStatus status);
    }

    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IOfferRepository _offerRepository;
        private readonly ISlotRepository _slotRepository;

        public BookingService(IBookingRepository bookingRepository, IOfferRepository offerRepository, ISlotRepository slotRepository)
        {
            _bookingRepository = bookingRepository;
            _offerRepository = offerRepository;
            _slotRepository = slotRepository;
        }

        public async Task<string?> CreateBookingAsync(BookingRequest request, Guid customerId)
        {
            var offer = await _offerRepository.GetByIdAsync(request.OfferId);
            if (offer == null || !OfferRules.IsOfferBookable(offer)) return null;

            var slot = await _slotRepository.GetByIdAsync(request.SlotId);
            if (slot == null || !SlotRules.IsSlotAvailable(slot, request.PeopleCount)) return null;

            var customerBookingCount = await _bookingRepository.GetCustomerBookingCountForOfferAsync(customerId, request.OfferId);
            if (BookingRules.HasExceededMaxBookings(customerBookingCount, offer.MaxBookingPerCustomer)) return null;

            slot.BookedCount += request.PeopleCount;
            slot.AvailableCount -= request.PeopleCount;
            if (slot.AvailableCount <= 0) slot.Status = SlotStatus.Full;

            var booking = new Booking
            {
                BookingReference = BookingRules.GenerateBookingReference(),
                OfferId = request.OfferId,
                SlotId = request.SlotId,
                CustomerId = customerId,
                CustomerName = request.CustomerName,
                CustomerPhone = request.CustomerPhone,
                CustomerEmail = request.CustomerEmail,
                PeopleCount = request.PeopleCount,
                SpecialNote = request.SpecialNote,
                BookingStatus = BookingStatus.Confirmed
            };

            await _bookingRepository.AddAsync(booking);
            _slotRepository.Update(slot);
            await _bookingRepository.SaveChangesAsync();

            return booking.BookingReference;
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync() => await _bookingRepository.GetAllAsync();

        public async Task<Booking?> GetBookingByIdAsync(Guid id) => await _bookingRepository.GetByIdAsync(id);

        public async Task<bool> UpdateBookingStatusAsync(Guid id, BookingStatus status)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            if (booking == null) return false;

            booking.BookingStatus = status;

            if (status == BookingStatus.Cancelled)
            {
                var slot = await _slotRepository.GetByIdAsync(booking.SlotId);
                if (slot != null)
                {
                    slot.BookedCount -= booking.PeopleCount;
                    slot.AvailableCount += booking.PeopleCount;
                    if (slot.Status == SlotStatus.Full && slot.AvailableCount > 0)
                        slot.Status = SlotStatus.Available;
                    _slotRepository.Update(slot);
                }
            }

            _bookingRepository.Update(booking);
            await _bookingRepository.SaveChangesAsync();
            return true;
        }
    }
}
