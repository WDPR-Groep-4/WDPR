namespace Backend;
public class Ticket
{
    public Guid TicketId { get; set; }
    public string Email { get; set; }
    public VoorstellingEvent VoorstellingEvent { get; set; }
    public string RangStoel { get; set; }
}

// Rang-Stoel
// 2-23