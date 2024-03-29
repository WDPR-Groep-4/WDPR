using System.ComponentModel.DataAnnotations.Schema;

namespace Backend;

public class PlanningEvent
{
    public int Id { get; set; }
    public DatumBereik DatumBereik { get; set; }
    public int Zaal { get; set; }
    public DateTime GetDatum()
    {
        return DatumBereik.Van;
    }
}