using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartOffer.Api.Models;

namespace SmartOffer.Api.Configurations
{
    public class AnalyticsConfiguration : IEntityTypeConfiguration<Analytics>
    {
        public void Configure(EntityTypeBuilder<Analytics> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Revenue).HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.Business)
                   .WithMany()
                   .HasForeignKey(x => x.BusinessId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
