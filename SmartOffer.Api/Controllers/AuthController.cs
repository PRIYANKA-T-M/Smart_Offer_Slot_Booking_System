using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Services;

namespace SmartOffer.Api.Controllers
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
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);
            if (response == null) return Unauthorized(new { message = "Invalid email or password" });

            return Ok(response);
        }
    }
}
