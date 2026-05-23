using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Services
{
    public interface ISlotService
    {
        Task<Guid?> CreateSlotAsync(SlotRequest request);
        Task<IEnumerable<OfferSlot>> GetSlotsByOfferIdAsync(Guid offerId);
        Task<bool> UpdateSlotAsync(Guid id, SlotRequest request);
        Task<bool> DeleteSlotAsync(Guid id);
    }

    public class SlotService : ISlotService
    {
        private readonly ISlotRepository _slotRepository;
        private readonly IOfferRepository _offerRepository;

        public SlotService(ISlotRepository slotRepository, IOfferRepository offerRepository)
        {
            _slotRepository = slotRepository;
            _offerRepository = offerRepository;
        }

        public async Task<Guid?> CreateSlotAsync(SlotRequest request)
        {
            var offer = await _offerRepository.GetByIdAsync(request.OfferId);
            if (offer == null) return null;

            var slot = new OfferSlot
            {
                OfferId = request.OfferId,
                SlotDate = request.SlotDate,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Capacity = request.Capacity,
                AvailableCount = request.Capacity,
                Status = SlotStatus.Available
            };

            await _slotRepository.AddAsync(slot);
            await _slotRepository.SaveChangesAsync();

            return slot.Id;
        }

        public async Task<IEnumerable<OfferSlot>> GetSlotsByOfferIdAsync(Guid offerId)
        {
            return await _slotRepository.GetSlotsByOfferIdAsync(offerId);
        }

        public async Task<bool> UpdateSlotAsync(Guid id, SlotRequest request)
        {
            var slot = await _slotRepository.GetByIdAsync(id);
            if (slot == null) return false;

            slot.Capacity = request.Capacity;
            slot.AvailableCount = slot.Capacity - slot.BookedCount;
            slot.Status = slot.AvailableCount <= 0 ? SlotStatus.Full : SlotStatus.Available;
            slot.UpdatedAt = DateTime.UtcNow;

            _slotRepository.Update(slot);
            await _slotRepository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSlotAsync(Guid id)
        {
            var slot = await _slotRepository.GetByIdAsync(id);
            if (slot == null || slot.BookedCount > 0) return false;

            _slotRepository.Delete(slot);
            await _slotRepository.SaveChangesAsync();
            return true;
        }
    }
}
