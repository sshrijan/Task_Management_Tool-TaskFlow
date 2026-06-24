using Microsoft.EntityFrameworkCore;
using TaskManagementToolWebApi.Data;

namespace TaskManagementToolWebApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context) 
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            return await _context.TaskItems
                .Include(t => t.User)
                .Include(t => t.Project)
                .ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _context.TaskItems
                .Include(t => t.User)
                .Include (t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem?> UpdateAsync(int id, TaskItem task) 
        {
            var existing = await _context.TaskItems.FindAsync(id);

            if (existing == null)
                return null;

            existing.Title = task.Title;
            existing.Description = task.Description;
            existing.Status = task.Status;
            existing.Priority = task.Priority;
            existing.AssignedToUserId = task.AssignedToUserId;
            existing.ProjectId = task.ProjectId;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);

            if (task == null)
                return false;

            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();

            return true;
        }




    }
}
