using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartOffer.Backend.Controllers;
using SmartOffer.Backend.Data;
using SmartOffer.Backend.Models;
using SmartOffer.Backend.DTOs;

namespace SmartOffer.Tests
{
    public class SecurityTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task CreateBooking_NullFields_ShouldFail()
        {
            var dbContext = GetDbContext();
            var offer = new Offer { Id = 1, ValidUntil = DateTime.UtcNow.AddDays(1), Status = "Active", MaxBookingsPerCustomer = 2 };
            var slot = new Slot { Id = 1, OfferId = 1, StartTime = DateTime.UtcNow.AddHours(1), Status = "Active", Capacity = 10, BookedCount = 0 };
            dbContext.Offers.Add(offer);
            dbContext.Slots.Add(slot);
            await dbContext.SaveChangesAsync();

            var controller = new BookingsController(dbContext);
            var dto = new CreateBookingDto { SlotId = 1, CustomerName = "", CustomerPhone = null };

            var result = await controller.CreateBooking(dto);
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
