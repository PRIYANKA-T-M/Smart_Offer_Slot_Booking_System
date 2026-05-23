using System;

namespace SmartOffer.Api.Models
{
    public class Analytics
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid BusinessId { get; set; }
        public Business Business { get; set; } = null!;
        public DateTime Date { get; set; }
        public int TotalViews { get; set; }
        public int TotalBookings { get; set; }
        public decimal Revenue { get; set; }
    }
}
