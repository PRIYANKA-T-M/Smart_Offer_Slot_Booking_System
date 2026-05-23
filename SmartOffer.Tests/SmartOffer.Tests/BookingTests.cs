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
    public class BookingTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task CreateBooking_DuplicatePhone_ShouldFail()
        {
            var dbContext = GetDbContext();
            var offer = new Offer { Id = 1, ValidUntil = DateTime.UtcNow.AddDays(1), Status = "Active", MaxBookingsPerCustomer = 2 };
            var slot = new Slot { Id = 1, OfferId = 1, StartTime = DateTime.UtcNow.AddHours(1), Status = "Active", Capacity = 10, BookedCount = 0 };
            dbContext.Offers.Add(offer);
            dbContext.Slots.Add(slot);
            await dbContext.SaveChangesAsync();

            var controller = new BookingsController(dbContext);
            var dto = new CreateBookingDto { SlotId = 1, CustomerName = "Test", CustomerPhone = "12345" };

            var result1 = await controller.CreateBooking(dto);
            Assert.IsType<OkObjectResult>(result1);

            var result2 = await controller.CreateBooking(dto);
            Assert.IsType<BadRequestObjectResult>(result2);
        }

        [Fact]
        public async Task CreateBooking_ZeroCapacity_ShouldFail()
        {
            var dbContext = GetDbContext();
            var offer = new Offer { Id = 1, ValidUntil = DateTime.UtcNow.AddDays(1), Status = "Active", MaxBookingsPerCustomer = 2 };
            var slot = new Slot { Id = 1, OfferId = 1, StartTime = DateTime.UtcNow.AddHours(1), Status = "Active", Capacity = 0, BookedCount = 0 };
            dbContext.Offers.Add(offer);
            dbContext.Slots.Add(slot);
            await dbContext.SaveChangesAsync();

            var controller = new BookingsController(dbContext);
            var dto = new CreateBookingDto { SlotId = 1, CustomerName = "Test", CustomerPhone = "12345" };

            var result = await controller.CreateBooking(dto);
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Contains("zero capacity", badRequest.Value.ToString());
        }
    }
}
