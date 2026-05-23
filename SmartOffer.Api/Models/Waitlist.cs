using System;

namespace SmartOffer.Api.Models
{
    public class Waitlist
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid OfferId { get; set; }
        public Offer Offer { get; set; } = null!;
        public Guid CustomerId { get; set; }
        public User Customer { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
