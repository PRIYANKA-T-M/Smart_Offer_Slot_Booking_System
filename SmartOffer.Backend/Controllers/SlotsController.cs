using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartOffer.Backend.Data;
using SmartOffer.Backend.Models;
using SmartOffer.Backend.DTOs;

namespace SmartOffer.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlotsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SlotsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSlot(CreateSlotDto dto)
        {
            var offer = await _context.Offers.FindAsync(dto.OfferId);
            if (offer == null) return NotFound("Offer not found.");

            if (dto.Capacity <= 0) return BadRequest("Capacity must be greater than zero.");

            var slot = new Slot
            {
                OfferId = dto.OfferId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Capacity = dto.Capacity,
                BookedCount = 0,
                Status = "Active"
            };

            _context.Slots.Add(slot);
            await _context.SaveChangesAsync();
            return Ok(slot);
        }
    }
}
