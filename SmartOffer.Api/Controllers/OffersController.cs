using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffer.Api.DTOs;
using SmartOffer.Api.Services;

namespace SmartOffer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OffersController : ControllerBase
    {
        private readonly IOfferService _offerService;

        public OffersController(IOfferService offerService)
        {
            _offerService = offerService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin,BusinessOwner")]
        public async Task<IActionResult> Create([FromBody] OfferRequest request)
        {
            var resultId = await _offerService.CreateOfferAsync(request);
            if (resultId == null) return BadRequest(new { message = "Invalid offer details. Ensure offer price is less than original price." });

            return CreatedAtAction(nameof(GetById), new { id = resultId }, new { Id = resultId });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var offers = await _offerService.GetActiveOffersAsync();
            return Ok(offers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var offer = await _offerService.GetOfferByIdAsync(id);
            if (offer == null) return NotFound();
            return Ok(offer);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,BusinessOwner")]
        public async Task<IActionResult> Update(Guid id, [FromBody] OfferRequest request)
        {
            var success = await _offerService.UpdateOfferAsync(id, request);
            if (!success) return BadRequest();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,BusinessOwner")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _offerService.DeleteOfferAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}
