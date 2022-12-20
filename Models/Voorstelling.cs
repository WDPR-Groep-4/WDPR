public class Voorstelling {
    public int VoorstellingId { get; set; }
    public string Titel { get; set; }
    public string Beschrijving { get; set; }
    public List<DatumBereik> DatumBereiken { get; set; }
    public int Duur { get; set; }
    public int Leeftijd { get; set; }
    public string Genre { get; set; }
    public string Afbeelding { get; set; }
    public string Banner { get; set; }
    public List<RangPrijs> Prijs { get; set; }
    public int ZaalId { get; set; }
}