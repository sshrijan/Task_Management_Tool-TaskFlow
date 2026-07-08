using Microsoft.AspNetCore.Mvc;
using TaskManagementToolWebApi.Services;

namespace TaskManagementToolWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _projectService.GetAllAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await _projectService.GetByIdAsync(id);

            if (project == null)
                return NotFound();

            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Project project)
        {
            var createdProject = await _projectService.CreateAsync(project);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdProject.ProjectId },
                createdProject);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Project project)
        {
            var updatedProject = await _projectService.UpdateAsync(id, project);

            if (updatedProject == null)
                return NotFound();

            return Ok(updatedProject);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _projectService.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}