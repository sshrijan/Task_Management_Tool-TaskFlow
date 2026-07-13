using TaskManagementToolWebApi.DTOs;

namespace TaskManagementToolWebApi.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User> CreateAsync(CreateUserDto dto);
        Task<User?> UpdateAsync(int id, UpdateUserDto dto);
        Task<bool> DeleteAsync(int id);

    }
}
