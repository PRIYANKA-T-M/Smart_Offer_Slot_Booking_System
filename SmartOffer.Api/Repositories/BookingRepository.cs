using Microsoft.EntityFrameworkCore;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SmartOffer.Api.Repositories
{
    public class BookingRepository : Repository<Booking>, IBookingRepository
    {
        public BookingRepository(ApplicationDbContext context) : base(context) { }

        public async Task<int> GetCustomerBookingCountForOfferAsync(Guid customerId, Guid offerId)
        {
            return await _dbSet.CountAsync(b => b.CustomerId == customerId && b.OfferId == offerId && b.BookingStatus != BookingStatus.Cancelled);
        }
    }
}
