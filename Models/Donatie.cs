public class Donatie
{
    public int Id { get; set; }
    public Gast? Gast { get; set; }
    public DateTime Datum { get; set; }
    public decimal Bedrag { get; set; }
}