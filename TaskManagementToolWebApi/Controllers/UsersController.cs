using Microsoft.AspNetCore.Mvc;

namespace TaskManagementToolWebApi.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
