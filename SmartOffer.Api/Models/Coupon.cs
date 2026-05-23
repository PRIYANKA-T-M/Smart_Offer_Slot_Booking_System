using System;

namespace SmartOffer.Api.Models
{
    public class Coupon
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Code { get; set; } = string.Empty;
        public decimal DiscountAmount { get; set; }
        public decimal? DiscountPercentage { get; set; }
        public DateOnly ExpiryDate { get; set; }
        public bool IsActive { get; set; } = true;
        public Guid? BusinessId { get; set; }
        public Business? Business { get; set; }
    }
}
