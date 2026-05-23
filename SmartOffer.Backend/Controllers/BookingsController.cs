using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartOffer.Backend.Data;
using SmartOffer.Backend.Models;
using SmartOffer.Backend.DTOs;

namespace SmartOffer.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private static readonly object _lock = new object();

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking(CreateBookingDto dto)
        {
            var slot = await _context.Slots.Include(s => s.Offer).FirstOrDefaultAsync(s => s.Id == dto.SlotId);
            if (slot == null || slot.Offer == null) return NotFound("Slot or Offer not found.");

            // Rule: Expired offers blocked
            if (slot.Offer.ValidUntil < DateTime.UtcNow || slot.Offer.Status != "Active")
            {
                return BadRequest("Offer is no longer valid or active.");
            }

            // Rule: Expired slot
            if (slot.StartTime < DateTime.UtcNow || slot.Status != "Active")
            {
                return BadRequest("Slot is expired or inactive.");
            }

            if (string.IsNullOrWhiteSpace(dto.CustomerPhone) || string.IsNullOrWhiteSpace(dto.CustomerName))
            {
                return BadRequest("Customer Name and Phone are required.");
            }

            // Rule: Max booking per customer
            var existingCustomerBookingsForOffer = await _context.Bookings
                .Include(b => b.Slot)
                .Where(b => b.Slot != null && b.Slot.OfferId == slot.OfferId && b.CustomerPhone == dto.CustomerPhone && b.Status != "Cancelled")
                .CountAsync();

            if (existingCustomerBookingsForOffer >= slot.Offer.MaxBookingsPerCustomer)
            {
                return BadRequest("Maximum bookings per customer reached for this offer.");
            }

            // Rule: Duplicate phone bookings on the exact same slot
            var duplicateSlotBooking = await _context.Bookings
                .Where(b => b.SlotId == dto.SlotId && b.CustomerPhone == dto.CustomerPhone && b.Status != "Cancelled")
                .AnyAsync();

            if (duplicateSlotBooking)
            {
                 return BadRequest("Customer has already booked this slot.");
            }

            lock (_lock)
            {
                _context.Entry(slot).Reload();

                // Rule: Full slots blocked
                if (slot.Capacity <= 0) return BadRequest("Slot has zero capacity.");
                if (slot.BookedCount >= slot.Capacity)
                {
                    return BadRequest("Slot is full.");
                }

                var reference = Guid.NewGuid().ToString().Substring(0, 8).ToUpper();

                var booking = new Booking
                {
                    BookingReference = reference,
                    SlotId = dto.SlotId,
                    CustomerName = dto.CustomerName,
                    CustomerPhone = dto.CustomerPhone,
                    BookingTime = DateTime.UtcNow,
                    Status = "Pending"
                };

                slot.BookedCount++;
                _context.Bookings.Add(booking);
                _context.SaveChanges();

                return Ok(booking);
            }
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateBookingStatusDto dto)
        {
            var booking = await _context.Bookings.Include(b => b.Slot).FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null) return NotFound();

            var validTransitions = new Dictionary<string, List<string>>
            {
                { "Pending", new List<string> { "Confirmed", "Cancelled" } },
                { "Confirmed", new List<string> { "Completed", "NoShow", "Cancelled" } }
            };

            if (!validTransitions.ContainsKey(booking.Status) || !validTransitions[booking.Status].Contains(dto.Status))
            {
                return BadRequest($"Invalid state transition from {booking.Status} to {dto.Status}");
            }

            booking.Status = dto.Status;

            if (dto.Status == "Cancelled" && booking.Slot != null)
            {
                 booking.Slot.BookedCount = Math.Max(0, booking.Slot.BookedCount - 1);
            }

            await _context.SaveChangesAsync();
            return Ok(booking);
        }
    }
}
