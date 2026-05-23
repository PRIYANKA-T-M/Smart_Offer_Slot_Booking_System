using Microsoft.EntityFrameworkCore;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartOffer.Api.Repositories
{
    public class OfferRepository : Repository<Offer>, IOfferRepository
    {
        public OfferRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<Offer>> GetActiveOffersAsync()
        {
            var now = DateOnly.FromDateTime(DateTime.UtcNow);
            return await _dbSet
                .Where(o => o.Status == OfferStatus.Active && o.EndDate >= now)
                .ToListAsync();
        }
    }
}
