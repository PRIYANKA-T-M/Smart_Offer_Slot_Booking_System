using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Services;

namespace SmartOffer.Api.Controllers
{
    [ApiController]
    [Route("api/slots")]
    public class SlotsController : ControllerBase
    {
        private readonly ISlotService _slotService;

        public SlotsController(ISlotService slotService)
        {
            _slotService = slotService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin,BusinessOwner")]
        public async Task<IActionResult> Create([FromBody] SlotRequest request)
        {
            var resultId = await _slotService.CreateSlotAsync(request);
            if (resultId == null) return BadRequest(new { message = "Offer not found." });

            return CreatedAtAction(nameof(GetById), new { id = resultId }, new { Id = resultId });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            return Ok(); // Simplified, in practice fetch single slot
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,BusinessOwner")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SlotRequest request)
        {
            var success = await _slotService.UpdateSlotAsync(id, request);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,BusinessOwner")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _slotService.DeleteSlotAsync(id);
            if (!success) return BadRequest(new { message = "Cannot delete slot with existing bookings or slot not found." });

            return NoContent();
        }
    }
}
