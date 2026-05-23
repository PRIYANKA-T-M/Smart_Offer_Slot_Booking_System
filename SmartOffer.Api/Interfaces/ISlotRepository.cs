using SmartOffer.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartOffer.Api.Interfaces
{
    public interface ISlotRepository : IRepository<OfferSlot>
    {
        Task<IEnumerable<OfferSlot>> GetSlotsByOfferIdAsync(Guid offerId);
    }
}
