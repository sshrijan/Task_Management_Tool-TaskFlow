using Microsoft.EntityFrameworkCore;
using TaskManagementToolWebApi.Data;
using TaskManagementToolWebApi.Models;

namespace TaskManagementToolWebApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;


        public AuthService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<User?> LoginAsync(string email, string password)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.Email.ToLower() == email.ToLower()
                    &&
                    u.PasswordHash == password
                );
        }
    }
}