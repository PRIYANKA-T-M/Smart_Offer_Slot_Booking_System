using FluentValidation;
using SmartOffer.Api.DTOs;

namespace SmartOffer.Api.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }

    public class BusinessRequestValidator : AbstractValidator<BusinessRequest>
    {
        public BusinessRequestValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Phone).NotEmpty().MaximumLength(20);
            RuleFor(x => x.OpeningTime).LessThan(x => x.ClosingTime).WithMessage("Opening time must be before closing time");
        }
    }

    public class OfferRequestValidator : AbstractValidator<OfferRequest>
    {
        public OfferRequestValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.OfferPrice).LessThan(x => x.OriginalPrice).WithMessage("Offer price must be less than original price");
            RuleFor(x => x.StartDate).LessThanOrEqualTo(x => x.EndDate).WithMessage("Start date cannot be after end date");
            RuleFor(x => x.TotalCapacity).GreaterThan(0);
            RuleFor(x => x.MaxBookingPerCustomer).GreaterThan(0);
        }
    }

    public class SlotRequestValidator : AbstractValidator<SlotRequest>
    {
        public SlotRequestValidator()
        {
            RuleFor(x => x.Capacity).GreaterThan(0);
            RuleFor(x => x.StartTime).LessThan(x => x.EndTime).WithMessage("Start time must be before end time");
        }
    }

    public class BookingRequestValidator : AbstractValidator<BookingRequest>
    {
        public BookingRequestValidator()
        {
            RuleFor(x => x.CustomerName).NotEmpty();
            RuleFor(x => x.CustomerEmail).NotEmpty().EmailAddress();
            RuleFor(x => x.CustomerPhone).NotEmpty();
            RuleFor(x => x.PeopleCount).GreaterThan(0);
        }
    }
}
