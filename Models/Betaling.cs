public class Betaling
{
    public int BetaalId { get; set; }
    public string Email { get; set; }
    public bool? Succes { get; set; }
    public bool Pending { get; set; }
}