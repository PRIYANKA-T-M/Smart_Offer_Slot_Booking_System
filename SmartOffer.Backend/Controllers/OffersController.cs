using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartOffer.Backend.Data;
using SmartOffer.Backend.Models;
using SmartOffer.Backend.DTOs;

namespace SmartOffer.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OffersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OffersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveOffers()
        {
            var offers = await _context.Offers
                .Include(o => o.Slots)
                .Where(o => o.Status == "Active" && o.ValidUntil > DateTime.UtcNow)
                .ToListAsync();
            return Ok(offers);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOffer(CreateOfferDto dto)
        {
            if (dto.OfferPrice >= dto.OriginalPrice)
            {
                return BadRequest("Offer price must be less than original price.");
            }
            if (dto.OfferPrice < 0 || dto.OriginalPrice < 0)
            {
                return BadRequest("Prices cannot be negative.");
            }

            var offer = new Offer
            {
                Title = dto.Title,
                Description = dto.Description,
                OriginalPrice = dto.OriginalPrice,
                OfferPrice = dto.OfferPrice,
                ValidUntil = dto.ValidUntil,
                MaxBookingsPerCustomer = dto.MaxBookingsPerCustomer,
                Status = "Active"
            };

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetActiveOffers), new { id = offer.Id }, offer);
        }
    }
}
