using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class PlanningController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger<PlanningController> _logger;
    public PlanningController(DatabaseContext context, ILogger<PlanningController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<PlanningEvent>>> GetEvents()
    {
        var events = await _context.Events.Include(e => e.DatumBereik).ToListAsync();
        if (events == null)
        {
            return NotFound();
        }
        return events;
    }

    [HttpPost]
    public async Task<ActionResult<PlanningEvent>> PostEvent(PlanningEvent planningEvent)
    {
        if (!IsDatumVrij(planningEvent.DatumBereik, planningEvent.Zaal))
        {
            return BadRequest();
        }
        await _context.Events.AddAsync(planningEvent);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEvents), new { id = planningEvent.Id }, planningEvent);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PlanningEvent>> PutEvent(int id, PlanningEvent planningEvent)
    {
        if (id != planningEvent.Id)
        {
            return BadRequest();
        }
        _context.Entry(planningEvent).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<PlanningEvent>> DeleteEvent(int id)
    {
        var planningEvent = await _context.Events.FindAsync(id);
        if (planningEvent == null)
        {
            return NotFound();
        }
        _context.Events.Remove(planningEvent);
        await _context.SaveChangesAsync();
        return planningEvent;
    }

    // zaal check toevoegen

    bool IsDatumVrij(DatumBereik datumBereik, int zaalId)
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

    //voorstellingen

    public PagedList<VoorstellingEvent> GetPagedVoorstellingEvents(VoorstellingEventParameters voorstellingEventParameters)
    {
        return PagedList<VoorstellingEvent>.ToPagedList(_context.Events.OfType<VoorstellingEvent>()
            .Include(e => e.Voorstelling)
            .Include(e => e.DatumBereik)
            .OrderBy(e => e.DatumBereik.Van), voorstellingEventParameters.PageNumber, voorstellingEventParameters.PageSize);
    }

    [HttpGet("voorstellingen")]
    public async Task<ActionResult<List<VoorstellingEvent>>> GetVoorstellingEvents(VoorstellingEventParameters VoorstellingEventParameters)
    {
        var voorstellingEvents = GetPagedVoorstellingEvents(VoorstellingEventParameters);
        if (voorstellingEvents == null)
        {
            return NotFound();
        }

        var metadata = new
        {
            voorstellingEvents.TotalCount,
            voorstellingEvents.PageSize,
            voorstellingEvents.CurrentPage,
            voorstellingEvents.TotalPages,
            voorstellingEvents.HasNext,
            voorstellingEvents.HasPrevious
        };

        return voorstellingEvents;
    }

    [HttpPost("voorstellingen")]
    public async Task<ActionResult<VoorstellingEvent>> PostVoorstellingEvent(VoorstellingEventDto voorstellingEventDto)
    {
        var voorstelling = await _context.Voorstellingen.FindAsync(voorstellingEventDto.VoorstellingId);
        if (voorstelling == null)
        {
            return NotFound();
        }

        DatumBereik datumBereik = new DatumBereik
        {
            Id = voorstellingEventDto.Id,
            Van = voorstellingEventDto.Van,
            Tot = voorstellingEventDto.Tot
        };
        var voorstellingEvent = new VoorstellingEvent
        {
            Voorstelling = voorstelling,
            DatumBereik = datumBereik
        };

        if (!IsDatumVrij(voorstellingEvent.DatumBereik, voorstellingEvent.Zaal))
        {
            return BadRequest();
        }

        await _context.Events.AddAsync(voorstellingEvent);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetVoorstellingEvents), new
        {
            id = voorstellingEvent.Id
        }, voorstellingEvent);
    }


    // verhuur

    [HttpGet("verhuur")]
    public async Task<ActionResult<List<VerhuurEvent>>> GetVerhuurEvents()
    {
        var verhuurEvents = await _context.Events.OfType<VerhuurEvent>().ToListAsync();
        if (verhuurEvents == null)
        {
            return NotFound();
        }
        return verhuurEvents;
    }

}

public class VoorstellingEventDto
{
    public int VoorstellingId { get; set; }
    public DateTime Van { get; set; }
    public DateTime Tot { get; set; }
    public int Id { get; set; }

}

public class VoorstellingEventParameters
{
    const int MaxPageSize = 20;
    public int PageNumber { get; set; } = 1;

    private int _pageSize = 10;
    public int PageSize
    {
        get { return _pageSize; }
        set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
    }
}


