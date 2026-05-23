using System;

namespace SmartOffer.Backend.DTOs
{
    public class CreateSlotDto
    {
        public int OfferId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Capacity { get; set; }
    }
}
