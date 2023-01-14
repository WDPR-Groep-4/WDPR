using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Backend;

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
        if (PlanningUtils.IsDatumVrij(planningEvent.DatumBereik, planningEvent.Zaal, _context))
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


