using System;

namespace SmartOffer.Backend.DTOs
{
    public class CreateOfferDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal OriginalPrice { get; set; }
        public decimal OfferPrice { get; set; }
        public DateTime ValidUntil { get; set; }
        public int MaxBookingsPerCustomer { get; set; }
    }
}
