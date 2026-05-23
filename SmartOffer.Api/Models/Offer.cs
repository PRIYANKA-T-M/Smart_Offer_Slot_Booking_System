using System;
using System.Collections.Generic;

namespace SmartOffer.Api.Models
{
    public class Offer
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid BusinessId { get; set; }
        public Business Business { get; set; } = null!;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal OriginalPrice { get; set; }
        public decimal OfferPrice { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int TotalCapacity { get; set; }
        public int MaxBookingPerCustomer { get; set; }
        public string TermsAndConditions { get; set; } = string.Empty;
        public OfferStatus Status { get; set; } = OfferStatus.Draft;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<OfferSlot> Slots { get; set; } = new List<OfferSlot>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
