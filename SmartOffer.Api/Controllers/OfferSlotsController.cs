using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Api.Services;

namespace SmartOffer.Api.Controllers
{
    [ApiController]
    [Route("api/offers/{offerId}/slots")]
    public class OfferSlotsController : ControllerBase
    {
        private readonly ISlotService _slotService;

        public OfferSlotsController(ISlotService slotService)
        {
            _slotService = slotService;
        }

        [HttpGet]
        public async Task<IActionResult> GetByOfferId(Guid offerId)
        {
            var slots = await _slotService.GetSlotsByOfferIdAsync(offerId);
            return Ok(slots);
        }
    }
}
