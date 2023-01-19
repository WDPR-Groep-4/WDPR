using System.ComponentModel.DataAnnotations.Schema;

namespace Backend;

public class VoorstellingEvent : PlanningEvent
{
    public Voorstelling Voorstelling { get; set; }

    public double getPrijs()
    {
        return Voorstelling.PrijzenPerRang[0].Prijs;
    }
}