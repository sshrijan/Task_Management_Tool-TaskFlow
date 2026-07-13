using Microsoft.AspNetCore.Mvc;
using TaskManagementToolWebApi.DTOs;
using TaskManagementToolWebApi.Services;

namespace TaskManagementToolWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;


        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {

            var user = await _authService.LoginAsync(
                request.Email,
                request.Password
            );


            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password"
                });
            }


            return Ok(new
            {
                user.UserId,
                user.Name,
                user.Email,
                Role = user.Role.ToString()
            });

        }
    }
}