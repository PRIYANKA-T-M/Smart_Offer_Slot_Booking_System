using System;

namespace SmartOffer.Api.DTOs
{
    public class BookingRequest
    {
        public Guid OfferId { get; set; }
        public Guid SlotId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public int PeopleCount { get; set; }
        public string SpecialNote { get; set; } = string.Empty;
    }

    public class BookingStatusUpdate
    {
        public string Status { get; set; } = string.Empty;
    }
}
