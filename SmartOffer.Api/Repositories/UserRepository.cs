using Microsoft.EntityFrameworkCore;
using SmartOffer.Api.Interfaces;
using SmartOffer.Api.Models;
using System.Threading.Tasks;

namespace SmartOffer.Api.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context) { }
        public async Task<User?> GetByEmailAsync(string email) => await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }
}
