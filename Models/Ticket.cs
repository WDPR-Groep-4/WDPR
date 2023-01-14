namespace Backend;
public class Ticket
{
    public Guid TicketId { get; set; }
    public string Email { get; set; }
    public VoorstellingEvent VoorstellingEvent { get; set; }
    public int Rang { get; set; }
    public int Stoel { get; set; }
}

// Rang-Stoel
// 2-23