using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Configurations
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.BookingReference).IsUnique();
            builder.Property(x => x.BookingReference).IsRequired().HasMaxLength(50);
            builder.Property(x => x.BookingStatus).HasConversion<string>();

            builder.HasOne(x => x.Offer)
                   .WithMany(o => o.Bookings)
                   .HasForeignKey(x => x.OfferId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Slot)
                   .WithMany(s => s.Bookings)
                   .HasForeignKey(x => x.SlotId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Customer)
                   .WithMany(u => u.Bookings)
                   .HasForeignKey(x => x.CustomerId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
