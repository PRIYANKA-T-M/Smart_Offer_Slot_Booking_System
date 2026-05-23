using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Configurations
{
    public class OfferSlotConfiguration : IEntityTypeConfiguration<OfferSlot>
    {
        public void Configure(EntityTypeBuilder<OfferSlot> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Status).HasConversion<string>();

            builder.HasOne(x => x.Offer)
                   .WithMany(o => o.Slots)
                   .HasForeignKey(x => x.OfferId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
