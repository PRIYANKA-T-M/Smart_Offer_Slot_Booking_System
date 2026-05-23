using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartOffer.Backend.Data;
using SmartOffer.Backend.DTOs;

namespace SmartOffer.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LifecyclesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LifecyclesController(AppDbContext context)
        {
            _context = context;
        }

        // Offer State Transitions
        [HttpPut("offers/{id}/status")]
        public async Task<IActionResult> UpdateOfferStatus(int id, [FromBody] string status)
        {
            var offer = await _context.Offers.FindAsync(id);
            if (offer == null) return NotFound("Offer not found.");

            var validStatuses = new[] { "Active", "Paused", "Cancelled", "Expired" };
            if (!validStatuses.Contains(status))
                return BadRequest("Invalid offer status.");

            offer.Status = status;

            // If offer is cancelled, cascade to slots
            if (status == "Cancelled")
            {
                var slots = await _context.Slots.Where(s => s.OfferId == id && s.Status == "Active").ToListAsync();
                foreach(var slot in slots)
                {
                    slot.Status = "Cancelled";
                }
            }

            await _context.SaveChangesAsync();
            return Ok(offer);
        }

        // Slot State Transitions
        [HttpPut("slots/{id}/status")]
        public async Task<IActionResult> UpdateSlotStatus(int id, [FromBody] string status)
        {
            var slot = await _context.Slots.FindAsync(id);
            if (slot == null) return NotFound("Slot not found.");

            var validStatuses = new[] { "Active", "Cancelled" };
            if (!validStatuses.Contains(status))
                return BadRequest("Invalid slot status.");

            slot.Status = status;
            await _context.SaveChangesAsync();
            return Ok(slot);
        }
    }
}
