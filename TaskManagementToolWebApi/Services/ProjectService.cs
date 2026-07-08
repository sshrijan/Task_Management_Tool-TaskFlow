using Microsoft.EntityFrameworkCore;
using TaskManagementToolWebApi.Data;

namespace TaskManagementToolWebApi.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            return await _context.Projects
                .Include(p => p.Tasks)
                .ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.ProjectId == id);
        }

        public async Task<Project> CreateAsync(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }

        public async Task<Project?> UpdateAsync(int id, Project project)
        {
            var existingProject = await _context.Projects.FindAsync(id);

            if (existingProject == null)
                return null;

            existingProject.Name = project.Name;
            existingProject.Description = project.Description;

            await _context.SaveChangesAsync();

            return existingProject;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
                return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}