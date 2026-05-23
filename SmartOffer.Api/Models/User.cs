using System;
using System.Collections.Generic;

namespace SmartOffer.Api.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.Customer;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Business> Businesses { get; set; } = new List<Business>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
