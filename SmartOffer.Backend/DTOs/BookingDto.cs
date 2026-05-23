namespace SmartOffer.Backend.DTOs
{
    public class CreateBookingDto
    {
        public int SlotId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
    }

    public class UpdateBookingStatusDto
    {
        public string Status { get; set; } = string.Empty;
    }
}
