using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;


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

        //filter op genre
        if (voorstellingEventParameters.Genre == "Alle")
        {
            voorstellingEventParameters.Genre = "";
        }
        if (!string.IsNullOrEmpty(voorstellingEventParameters.Genre))
        {
            voorstellingEvents = voorstellingEvents.Where(e => e.Voorstelling.Genre.ToLower() == voorstellingEventParameters.Genre.ToLower());
        }

        //Zoeken
        if (!string.IsNullOrEmpty(voorstellingEventParameters.SearchQuery))
        {
            ZoekVoorstelling(ref voorstellingEvents, voorstellingEventParameters.SearchQuery);
        }

        //Sorteren
        ApplySort(ref voorstellingEvents, voorstellingEventParameters.OrderBy);

        return PagedList<VoorstellingEvent>.ToPagedList(voorstellingEvents
            .Include(e => e.Voorstelling)
            .Include(e => e.DatumBereik),
             voorstellingEventParameters.PageNumber, voorstellingEventParameters.PageSize);
    }

    public void ZoekVoorstelling(ref IQueryable<VoorstellingEvent> voorstellingEvents, string searchQuery)
    {
        //zoek op titel en beschrijving
        voorstellingEvents = voorstellingEvents.Where(e => e.Voorstelling.Titel.ToLower()
        .Contains(searchQuery.ToLower()) || e.Voorstelling.Beschrijving.ToLower()
        .Contains(searchQuery.ToLower()));
    }

    private void ApplySort(ref IQueryable<VoorstellingEvent> voorstellingEvents, string orderByQueryString)
    {
        if (!voorstellingEvents.Any())
            return;
        if (string.IsNullOrWhiteSpace(orderByQueryString) || orderByQueryString == "Datum")
        {
            voorstellingEvents = voorstellingEvents.OrderBy(x => x.DatumBereik.Van);
            return;
        }
        if (orderByQueryString == "Prijs asc")
        {
            voorstellingEvents = voorstellingEvents.OrderBy(x => x.Voorstelling.PrijzenPerRang.First().Prijs);
            return;
        }
        if (orderByQueryString == "Prijs desc")
        {
            voorstellingEvents = voorstellingEvents.OrderByDescending(x => x.Voorstelling.PrijzenPerRang.First().Prijs);
            return;
        }
        if (orderByQueryString == "Titel")
        {
            voorstellingEvents = voorstellingEvents.OrderBy(x => x.Voorstelling.Titel);
            return;
        }
        var orderParams = orderByQueryString.Trim().Split(',');
        var propertyInfos = typeof(VoorstellingEvent).GetProperties(BindingFlags.Public | BindingFlags.Instance);
        var orderQueryBuilder = new StringBuilder();
        foreach (var param in orderParams)
        {
            if (string.IsNullOrWhiteSpace(param))
                continue;
            var propertyFromQueryName = param.Split(" ")[0];

            var objectProperty = propertyInfos.FirstOrDefault(pi => pi.Name.Equals(propertyFromQueryName, StringComparison.InvariantCultureIgnoreCase));
            if (objectProperty == null)
                continue;
            var sortingOrder = param.EndsWith(" desc") ? "descending" : "ascending";
            orderQueryBuilder.Append($"{objectProperty.Name.ToString()} {sortingOrder}, ");
            _logger.LogInformation($"Ordering by {objectProperty.Name.ToString()} {sortingOrder}");
        }
        var orderQuery = orderQueryBuilder.ToString().TrimEnd(',', ' ');
        if (string.IsNullOrWhiteSpace(orderQuery))
        {
            _logger.LogWarning($"Could not parse '{orderByQueryString}' into a valid order query");
            voorstellingEvents = voorstellingEvents.OrderBy(x => x.DatumBereik.Van);
            return;
        }
        voorstellingEvents = voorstellingEvents.OrderBy(orderQuery);
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

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<Voorstelling>> GetVoorstellingEvents()
    {
        var events = await _context.VoorstellingEvents.ToListAsync();
        var voorstellingen = await _context.VoorstellingEvents.Include(v => v.Voorstelling).Include(v => v.Voorstelling.PrijzenPerRang).Include(v => v.DatumBereik).ToListAsync();
        if (events == null)
        {
            return NotFound();
        }
        return Ok(events);
    }

    [HttpPost]
    [Authorize(Roles = "Administrator, Medewerker")]
    public async Task<ActionResult> PostVoorstellingEvent([FromBody] CreateVoorstellingEvent voorstellingEventDto)
    {
        var voorstelling = await _context.Voorstellingen.FindAsync(voorstellingEventDto.VoorstellingId);
        if (voorstelling == null)
        {
            return NotFound();
        }

        var van = DateTime.Parse(voorstellingEventDto.Datum + " " + voorstellingEventDto.Van);
        var tot = DateTime.Parse(voorstellingEventDto.Datum + " " + voorstellingEventDto.Van);

        DatumBereik datumBereik = new DatumBereik
        {
            Van = van,
            Tot = tot
        };
        
        var voorstellingEvent = new VoorstellingEvent
        {
            Voorstelling = voorstelling,
            DatumBereik = datumBereik,
            Zaal = voorstellingEventDto.Zaal
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

    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator, Medewerker")]
    public async Task<ActionResult> DeleteVoorstellingEvent(int id)
    {
        var voorstellingEvent = await _context.Events.FindAsync(id);
        if (voorstellingEvent == null)
        {
            return NotFound();
        }

        _context.Events.Remove(voorstellingEvent);
        await _context.SaveChangesAsync();
        return NoContent();
    }


}

public class VoorstellingEventParameters : QueryStringParameters
{
    public VoorstellingEventParameters()
    {
        OrderBy = "Datum";
    }
    public string Genre { get; set; } = "";
    public List<string> Genres { get; set; } = new List<string>(){
        "comedy", "musical", "drama", "kinderen", "klassiek", "pop", "alle"
    };
    public bool GenreCorrect => Genres.Contains(Genre.ToLower());
    public string? SearchQuery { get; set; } = "";
}

public class CreateVoorstellingEvent{
    public int VoorstellingId { get; set; }
    public string? Van { get; set; }
    public string? Tot { get; set; }
    public string? Datum { get; set; }
    public int Zaal { get; set; }
}

