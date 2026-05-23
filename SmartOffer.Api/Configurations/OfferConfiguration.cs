using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Configurations
{
    public class OfferConfiguration : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(200);
            builder.Property(x => x.OriginalPrice).HasColumnType("decimal(18,2)");
            builder.Property(x => x.OfferPrice).HasColumnType("decimal(18,2)");
            builder.Property(x => x.DiscountPercentage).HasColumnType("decimal(5,2)");
            builder.Property(x => x.Status).HasConversion<string>();

            builder.HasOne(x => x.Business)
                   .WithMany(b => b.Offers)
                   .HasForeignKey(x => x.BusinessId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
