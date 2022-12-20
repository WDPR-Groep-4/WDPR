public class Ticket
{
    public int Id { get; set; }
    public Gast Gast { get; set; }
    public Voorstelling Voorstelling { get; set; }
    public DatumBereik DatumBereik { get; set; }
    public string RangRijStoel { get; set; }
}

// Rang-Rij-Stoel
// 2-5-23