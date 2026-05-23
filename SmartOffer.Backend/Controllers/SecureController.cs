using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartOffer.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requires valid JWT
    public class SecureController : ControllerBase
    {
        [HttpGet("data")]
        public IActionResult GetSecureData()
        {
            return Ok(new { Message = "This is secure data." });
        }
    }
}
