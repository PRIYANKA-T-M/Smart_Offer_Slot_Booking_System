namespace SmartOffer.Api.DTOs
{
    public class DashboardSummary
    {
        public int TotalOffers { get; set; }
        public int ActiveOffers { get; set; }
        public int TotalBookings { get; set; }
        public int TodaysBookings { get; set; }
        public int BookedSeats { get; set; }
        public int AvailableSeats { get; set; }
        public decimal ConversionRate { get; set; }
        public decimal Revenue { get; set; }
        public decimal CancellationRate { get; set; }
    }
}
