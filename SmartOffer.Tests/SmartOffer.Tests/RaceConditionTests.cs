using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartOffer.Backend.Controllers;
using SmartOffer.Backend.Data;
using SmartOffer.Backend.Models;
using SmartOffer.Backend.DTOs;
using Microsoft.Extensions.DependencyInjection;

namespace SmartOffer.Tests
{
    public class RaceConditionTests
    {
        private DbContextOptions<AppDbContext> _options;

        public RaceConditionTests()
        {
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
        }

        private AppDbContext GetDbContext() => new AppDbContext(_options);

        [Fact]
        public async Task CreateBooking_SimultaneousRaceCondition_ShouldNotExceedCapacity()
        {
            using (var dbContext = GetDbContext())
            {
                var offer = new Offer { Id = 1, ValidUntil = DateTime.UtcNow.AddDays(1), Status = "Active", MaxBookingsPerCustomer = 10 };
                var slot = new Slot { Id = 1, OfferId = 1, StartTime = DateTime.UtcNow.AddHours(1), Status = "Active", Capacity = 5, BookedCount = 0 };
                dbContext.Offers.Add(offer);
                dbContext.Slots.Add(slot);
                await dbContext.SaveChangesAsync();
            }

            var tasks = new Task[10];
            for (int i = 0; i < 10; i++)
            {
                var dto = new CreateBookingDto { SlotId = 1, CustomerName = $"Test{i}", CustomerPhone = $"Phone{i}" };
                tasks[i] = Task.Run(async () => {
                    // Each gets its own DbContext instance to avoid concurrent DbContext usage errors
                    using var ctx = GetDbContext();
                    var controller = new BookingsController(ctx);
                    await controller.CreateBooking(dto);
                });
            }

            await Task.WhenAll(tasks);

            using (var dbContext = GetDbContext())
            {
                var finalSlot = await dbContext.Slots.FindAsync(1);
                Assert.NotNull(finalSlot);
                Assert.True(finalSlot.BookedCount <= 5, $"Booked count {finalSlot.BookedCount} exceeded capacity of 5");
            }
        }
    }
}
