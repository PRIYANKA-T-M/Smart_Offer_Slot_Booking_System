using SmartOffer.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartOffer.Api.Interfaces
{
    public interface IBookingRepository : IRepository<Booking>
    {
        Task<int> GetCustomerBookingCountForOfferAsync(Guid customerId, Guid offerId);
    }
}
