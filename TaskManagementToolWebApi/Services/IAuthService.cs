using TaskManagementToolWebApi.Models;

namespace TaskManagementToolWebApi.Services
{
    public interface IAuthService
    {
        Task<User?> LoginAsync(string email, string password);
    }
}