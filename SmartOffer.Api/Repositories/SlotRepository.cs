using Microsoft.EntityFrameworkCore;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartOffer.Api.Repositories
{
    public class SlotRepository : Repository<OfferSlot>, ISlotRepository
    {
        public SlotRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<OfferSlot>> GetSlotsByOfferIdAsync(Guid offerId)
        {
            return await _dbSet.Where(s => s.OfferId == offerId).ToListAsync();
        }
    }
}
