using System;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.BusinessRules
{
    public static class OfferRules
    {
        public static bool IsValidPrice(decimal offerPrice, decimal originalPrice)
        {
            return offerPrice < originalPrice;
        }

        public static bool IsOfferBookable(Offer offer)
        {
            return offer.Status == OfferStatus.Active && offer.EndDate >= DateOnly.FromDateTime(DateTime.UtcNow);
        }
    }

    public static class SlotRules
    {
        public static bool IsSlotAvailable(OfferSlot slot, int requiredCapacity)
        {
            return slot.Status == SlotStatus.Available && slot.AvailableCount >= requiredCapacity;
        }

        public static bool IsSlotInFuture(OfferSlot slot)
        {
            var now = DateTime.UtcNow;
            var slotDateTime = slot.SlotDate.ToDateTime(TimeOnly.FromTimeSpan(slot.StartTime));
            return slotDateTime > now;
        }
    }

    public static class BookingRules
    {
        public static bool HasExceededMaxBookings(int currentBookings, int maxAllowed)
        {
            return currentBookings >= maxAllowed;
        }

        public static string GenerateBookingReference()
        {
            return $"BKG-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}";
        }
    }
}
