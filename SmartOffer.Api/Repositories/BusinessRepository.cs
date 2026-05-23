using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Repositories
{
    public class BusinessRepository : Repository<Business>, IBusinessRepository
    {
        public BusinessRepository(ApplicationDbContext context) : base(context) { }
    }
}
