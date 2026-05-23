using System;

namespace SmartOffer.Api.DTOs
{
    public class SlotRequest
    {
        public Guid OfferId { get; set; }
        public DateOnly SlotDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int Capacity { get; set; }
    }
}
