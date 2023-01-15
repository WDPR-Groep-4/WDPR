using Microsoft.EntityFrameworkCore;

namespace Backend;

public class PlanningUtils
{
    public static bool IsDatumVrij(DatumBereik datumBereik, int zaalId, DatabaseContext _context)
    {
        var events = _context.Events.Include(e => e.DatumBereik).ToList();
        var zaalEvents = events.Where(e => e.Zaal == zaalId).ToList();

        foreach (var e in zaalEvents)
        {
            if (e.DatumBereik.Van <= datumBereik.Tot && e.DatumBereik.Tot >= datumBereik.Van)
            {
                return false;
            }
        }
        return true;
    }

}