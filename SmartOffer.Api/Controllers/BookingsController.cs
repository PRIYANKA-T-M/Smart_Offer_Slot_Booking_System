using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Models;
using SmartOffer.Api.Services;

namespace SmartOffer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] BookingRequest request)
        {
            var customerIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(customerIdString) || !Guid.TryParse(customerIdString, out var customerId))
                return Unauthorized();

            var reference = await _bookingService.CreateBookingAsync(request, customerId);
            if (reference == null) return BadRequest(new { message = "Booking failed. Slot may be full, offer expired, or you've exceeded maximum bookings." });

            return Ok(new { BookingReference = reference });
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(Guid id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null) return NotFound();
            return Ok(booking);
        }

        [HttpPut("{id}/status")]
        [Authorize]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] BookingStatusUpdate update)
        {
            if (!Enum.TryParse<BookingStatus>(update.Status, true, out var status))
                return BadRequest(new { message = "Invalid status" });

            var success = await _bookingService.UpdateBookingStatusAsync(id, status);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}
