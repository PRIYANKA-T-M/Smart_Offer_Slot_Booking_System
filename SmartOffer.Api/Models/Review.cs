using System;

namespace SmartOffer.Api.Models
{
    public class Review
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid OfferId { get; set; }
        public Offer Offer { get; set; } = null!;
        public Guid CustomerId { get; set; }
        public User Customer { get; set; } = null!;
        public int Rating { get; set; } // 1-5
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
