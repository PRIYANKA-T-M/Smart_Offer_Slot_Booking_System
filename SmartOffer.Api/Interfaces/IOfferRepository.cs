using SmartOffer.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartOffer.Api.Interfaces
{
    public interface IOfferRepository : IRepository<Offer>
    {
        Task<IEnumerable<Offer>> GetActiveOffersAsync();
    }
}
