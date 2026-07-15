using Microsoft.EntityFrameworkCore;
using TaskManagementToolWebApi.Data;
using TaskManagementToolWebApi.DTOs;
using TaskManagementToolWebApi.Models;

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

        public async Task<IEnumerable<TaskItem>> GetByUserIdAsync(int userId)
        {
            return await _context.TaskItems
                .Include(t => t.Project)
                .Include(t => t.User)
                .Where(t => t.AssignedToUserId == userId)
                .ToListAsync();
        }

        public async Task<User> CreateAsync(CreateUserDto dto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (existingUser != null)
            {
                throw new Exception("Email already exists");
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = dto.PasswordHash,
                Role = UserRole.Member,
                IsActive = true
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> UpdateAsync(int id, UpdateUserDto dto)
        {
            var existingUser = await _context.Users.FindAsync(id);

            if (existingUser == null)
                return null;

            existingUser.Name = dto.Name;
            existingUser.Email = dto.Email;

            if (!string.IsNullOrWhiteSpace(dto.PasswordHash))
                existingUser.PasswordHash = dto.PasswordHash;

            existingUser.Role = dto.Role;
            existingUser.IsActive = dto.IsActive;

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