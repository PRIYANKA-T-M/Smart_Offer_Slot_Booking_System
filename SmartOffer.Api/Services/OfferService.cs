using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOffer.Api.BusinessRules;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Services
{
    public interface IOfferService
    {
        Task<Guid?> CreateOfferAsync(OfferRequest request);
        Task<IEnumerable<Offer>> GetActiveOffersAsync();
        Task<Offer?> GetOfferByIdAsync(Guid id);
        Task<bool> UpdateOfferAsync(Guid id, OfferRequest request);
        Task<bool> DeleteOfferAsync(Guid id);
    }

    public class OfferService : IOfferService
    {
        private readonly IOfferRepository _offerRepository;

        public OfferService(IOfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }

        public async Task<Guid?> CreateOfferAsync(OfferRequest request)
        {
            if (!OfferRules.IsValidPrice(request.OfferPrice, request.OriginalPrice))
                return null;

            decimal discountPercentage = request.OriginalPrice > 0 ? ((request.OriginalPrice - request.OfferPrice) / request.OriginalPrice) * 100 : 0;

            var offer = new Offer
            {
                BusinessId = request.BusinessId,
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                OriginalPrice = request.OriginalPrice,
                OfferPrice = request.OfferPrice,
                DiscountPercentage = discountPercentage,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                TotalCapacity = request.TotalCapacity,
                MaxBookingPerCustomer = request.MaxBookingPerCustomer,
                TermsAndConditions = request.TermsAndConditions,
                Status = OfferStatus.Active
            };

            await _offerRepository.AddAsync(offer);
            await _offerRepository.SaveChangesAsync();

            return offer.Id;
        }

        public async Task<IEnumerable<Offer>> GetActiveOffersAsync()
        {
            return await _offerRepository.GetActiveOffersAsync();
        }

        public async Task<Offer?> GetOfferByIdAsync(Guid id)
        {
            return await _offerRepository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateOfferAsync(Guid id, OfferRequest request)
        {
            if (!OfferRules.IsValidPrice(request.OfferPrice, request.OriginalPrice))
                return false;

            var offer = await _offerRepository.GetByIdAsync(id);
            if (offer == null)
                return false;

            offer.Title = request.Title;
            offer.Description = request.Description;
            offer.Category = request.Category;
            offer.OriginalPrice = request.OriginalPrice;
            offer.OfferPrice = request.OfferPrice;
            offer.DiscountPercentage = request.OriginalPrice > 0 ? ((request.OriginalPrice - request.OfferPrice) / request.OriginalPrice) * 100 : 0;
            offer.StartDate = request.StartDate;
            offer.EndDate = request.EndDate;
            offer.StartTime = request.StartTime;
            offer.EndTime = request.EndTime;
            offer.TotalCapacity = request.TotalCapacity;
            offer.MaxBookingPerCustomer = request.MaxBookingPerCustomer;
            offer.TermsAndConditions = request.TermsAndConditions;
            offer.UpdatedAt = DateTime.UtcNow;

            _offerRepository.Update(offer);
            await _offerRepository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteOfferAsync(Guid id)
        {
            var offer = await _offerRepository.GetByIdAsync(id);
            if (offer == null)
                return false;

            offer.Status = OfferStatus.Cancelled;
            offer.UpdatedAt = DateTime.UtcNow;

            _offerRepository.Update(offer);
            await _offerRepository.SaveChangesAsync();
            return true;
        }
    }
}
