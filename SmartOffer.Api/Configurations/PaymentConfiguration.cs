using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Configurations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Amount).HasColumnType("decimal(18,2)");
            builder.Property(x => x.Status).HasConversion<string>();

            builder.HasOne(x => x.Booking)
                   .WithMany()
                   .HasForeignKey(x => x.BookingId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
