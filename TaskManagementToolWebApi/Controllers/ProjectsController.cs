using Microsoft.AspNetCore.Mvc;

namespace TaskManagementToolWebApi.Controllers
{
    public class ProjectsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
