using System;
using SmartOffer.Api.BusinessRules;
using SmartOffer.Api.Models;
using Xunit;

namespace SmartOffer.UnitTests
{
    public class BusinessRulesTests
    {
        [Theory]
        [InlineData(80, 100, true)]
        [InlineData(100, 100, false)]
        [InlineData(120, 100, false)]
        public void IsValidPrice_ShouldValidateCorrectly(decimal offerPrice, decimal originalPrice, bool expected)
        {
            var result = OfferRules.IsValidPrice(offerPrice, originalPrice);
            Assert.Equal(expected, result);
        }

        [Fact]
        public void IsOfferBookable_ShouldReturnTrue_ForActiveFutureOffer()
        {
            var offer = new Offer
            {
                Status = OfferStatus.Active,
                EndDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1))
            };

            var result = OfferRules.IsOfferBookable(offer);

            Assert.True(result);
        }

        [Fact]
        public void IsOfferBookable_ShouldReturnFalse_ForExpiredOffer()
        {
            var offer = new Offer
            {
                Status = OfferStatus.Active,
                EndDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1))
            };

            var result = OfferRules.IsOfferBookable(offer);

            Assert.False(result);
        }
    }
}
