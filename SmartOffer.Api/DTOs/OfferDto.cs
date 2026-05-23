using System;

namespace SmartOffer.Api.DTOs
{
    public class OfferRequest
    {
        public Guid BusinessId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal OriginalPrice { get; set; }
        public decimal OfferPrice { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int TotalCapacity { get; set; }
        public int MaxBookingPerCustomer { get; set; }
        public string TermsAndConditions { get; set; } = string.Empty;
    }
}
