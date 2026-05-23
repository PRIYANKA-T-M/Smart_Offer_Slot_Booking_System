using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Services
{
    public interface IBusinessService
    {
        Task<BusinessResponse> CreateBusinessAsync(BusinessRequest request, Guid ownerId);
        Task<IEnumerable<Business>> GetAllBusinessesAsync();
        Task<Business?> GetBusinessByIdAsync(Guid id);
        Task<bool> UpdateBusinessAsync(Guid id, BusinessRequest request, Guid ownerId);
    }

    public class BusinessService : IBusinessService
    {
        private readonly IBusinessRepository _businessRepository;

        public BusinessService(IBusinessRepository businessRepository)
        {
            _businessRepository = businessRepository;
        }

        public async Task<BusinessResponse> CreateBusinessAsync(BusinessRequest request, Guid ownerId)
        {
            var business = new Business
            {
                OwnerId = ownerId,
                Name = request.Name,
                BusinessType = request.BusinessType,
                OwnerName = request.OwnerName,
                Phone = request.Phone,
                Email = request.Email,
                Address = request.Address,
                City = request.City,
                OpeningTime = request.OpeningTime,
                ClosingTime = request.ClosingTime,
                Logo = request.Logo
            };

            await _businessRepository.AddAsync(business);
            await _businessRepository.SaveChangesAsync();

            return new BusinessResponse
            {
                Id = business.Id,
                Name = business.Name,
                BusinessType = business.BusinessType,
                City = business.City
            };
        }

        public async Task<IEnumerable<Business>> GetAllBusinessesAsync()
        {
            return await _businessRepository.GetAllAsync();
        }

        public async Task<Business?> GetBusinessByIdAsync(Guid id)
        {
            return await _businessRepository.GetByIdAsync(id);
        }

        public async Task<bool> UpdateBusinessAsync(Guid id, BusinessRequest request, Guid ownerId)
        {
            var business = await _businessRepository.GetByIdAsync(id);
            if (business == null || business.OwnerId != ownerId)
                return false;

            business.Name = request.Name;
            business.BusinessType = request.BusinessType;
            business.OwnerName = request.OwnerName;
            business.Phone = request.Phone;
            business.Email = request.Email;
            business.Address = request.Address;
            business.City = request.City;
            business.OpeningTime = request.OpeningTime;
            business.ClosingTime = request.ClosingTime;
            business.Logo = request.Logo;
            business.UpdatedAt = DateTime.UtcNow;

            _businessRepository.Update(business);
            await _businessRepository.SaveChangesAsync();
            return true;
        }
    }
}
