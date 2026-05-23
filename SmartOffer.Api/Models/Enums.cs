namespace SmartOffer.Api.Models
{
    public enum UserRole
    {
        Admin,
        BusinessOwner,
        Customer
    }

    public enum OfferStatus
    {
        Draft,
        Active,
        Paused,
        Expired,
        Cancelled
    }

    public enum SlotStatus
    {
        Available,
        Full,
        Closed,
        Expired,
        Cancelled
    }

    public enum BookingStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed,
        NoShow
    }

    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed,
        Refunded
    }
}
