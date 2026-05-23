using System;
using System.Collections.Generic;

namespace SmartOffer.Backend.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal OriginalPrice { get; set; }
        public decimal OfferPrice { get; set; }
        public DateTime ValidUntil { get; set; }
        public int MaxBookingsPerCustomer { get; set; }
        public string Status { get; set; } = "Active"; // Active, Paused, Cancelled, Expired

        public ICollection<Slot> Slots { get; set; } = new List<Slot>();
    }
}
