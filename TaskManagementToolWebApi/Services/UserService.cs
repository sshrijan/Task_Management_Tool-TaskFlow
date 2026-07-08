using Microsoft.EntityFrameworkCore;
using TaskManagementToolWebApi.Data;

namespace TaskManagementToolWebApi.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .Include(u => u.Tasks)
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Tasks)
                .FirstOrDefaultAsync(u => u.UserId == id);
        }

        public async Task<User> CreateAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> UpdateAsync(int id, User user)
        {
            var existingUser = await _context.Users.FindAsync(id);

            if (existingUser == null)
                return null;

            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.PasswordHash = user.PasswordHash;
            existingUser.Role = user.Role;
            existingUser.IsActive = user.IsActive;

            await _context.SaveChangesAsync();

            return existingUser;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}