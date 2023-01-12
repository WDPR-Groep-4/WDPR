namespace Backend;
public class Betaling
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public bool? Succes { get; set; }
    public bool Pending { get; set; }
    public List<WinkelwagenItem> WinkelwagenItems { get; set; }
}