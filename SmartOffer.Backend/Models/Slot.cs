using System;
using System.Collections.Generic;

namespace SmartOffer.Backend.Models
{
    public class Slot
    {
        public int Id { get; set; }
        public int OfferId { get; set; }
        public Offer? Offer { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Capacity { get; set; }
        public int BookedCount { get; set; }
        public string Status { get; set; } = "Active"; // Active, Cancelled

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
