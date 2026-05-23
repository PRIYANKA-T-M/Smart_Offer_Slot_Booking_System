using SmartOffer.Api.Models;
using System.Threading.Tasks;

namespace SmartOffer.Api.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
    }
}
