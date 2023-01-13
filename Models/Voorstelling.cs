public class Voorstelling
{
    public int VoorstellingId { get; set; }
    public string Titel { get; set; }
    public string Beschrijving { get; set; }
    public int Leeftijd { get; set; }
    public string Genre { get; set; }
    public string Afbeelding { get; set; }
    public string Banner { get; set; }
    public List<RangPrijs> PrijzenPerRang { get; set; }
    public int ZaalId { get; set; }
}