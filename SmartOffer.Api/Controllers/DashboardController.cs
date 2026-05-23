using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Api.DTOs;

namespace SmartOffer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,BusinessOwner")]
    public class DashboardController : ControllerBase
    {
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            // Placeholder logic. In real app, calculate via Service/Repository.
            var summary = new DashboardSummary
            {
                TotalOffers = 10,
                ActiveOffers = 5,
                TotalBookings = 150,
                TodaysBookings = 20,
                BookedSeats = 300,
                AvailableSeats = 500,
                ConversionRate = 15.5m,
                Revenue = 5000.00m,
                CancellationRate = 5.0m
            };

            return Ok(await Task.FromResult(summary));
        }
    }
}
