namespace Backend;
public class Ticket
{
    public Guid TicketId { get; set; }
    public string Email { get; set; }
    public VoorstellingEvent VoorstellingEvent { get; set; }
    public string RangRijStoel { get; set; }
}

// Rang-Rij-Stoel
// 2-5-23