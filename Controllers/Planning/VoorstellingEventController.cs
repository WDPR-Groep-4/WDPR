using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class VoorstellingEventController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger<VoorstellingEventController> _logger;

    public VoorstellingEventController(DatabaseContext context, ILogger<VoorstellingEventController> logger)
    {
        _context = context;
        _logger = logger;
    }

    public PagedList<VoorstellingEvent> GetPagedVoorstellingEvents(VoorstellingEventParameters voorstellingEventParameters)
    {
        var voorstellingEvents = _context.Events.OfType<VoorstellingEvent>();

        if (!string.IsNullOrEmpty(voorstellingEventParameters.Genre))
        {
            voorstellingEvents = voorstellingEvents.Where(e => e.Voorstelling.Genre == voorstellingEventParameters.Genre);
        }

        return PagedList<VoorstellingEvent>.ToPagedList(voorstellingEvents
            .Include(e => e.Voorstelling)
            .Include(e => e.DatumBereik)
            .OrderBy(e => e.DatumBereik.Van), voorstellingEventParameters.PageNumber, voorstellingEventParameters.PageSize);
    }

    [HttpGet]
    public async Task<ActionResult<List<VoorstellingEvent>>> GetVoorstellingEvents([FromQuery] VoorstellingEventParameters VoorstellingEventParameters)
    {
        if (!VoorstellingEventParameters.GenreCorrect)
        {
            return BadRequest("Genre is niet correct");
        }

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

        Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

        return voorstellingEvents;
    }

    [HttpPost("voorstellingen")]
    public async Task<ActionResult<VoorstellingEvent>> PostVoorstellingEvent([FromQuery] VoorstellingEventDto? voorstellingEventDto)
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

        if (!PlanningUtils.IsDatumVrij(voorstellingEvent.DatumBereik, voorstellingEvent.Zaal, _context))
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
}

public class VoorstellingEventParameters : QueryStringParameters
{
    public string Genre { get; set; } = "";
    public List<string> Genres { get; set; } = new List<string>(){
        "Comedy", "Musical", "Drama", "Kinderen", "Klassiek", "Pop", ""
    };
    public bool GenreCorrect => Genres.Contains(Genre);
}


