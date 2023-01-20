using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class VoorstellingController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger<VoorstellingController> _logger;
    public VoorstellingController(DatabaseContext context, ILogger<VoorstellingController> logger)
    {
        _context = context;
        _logger = logger;
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Voorstelling>> GetVoorstelling(int id)
    {
        var voorstelling = await _context.Voorstellingen.Where(v => v.VoorstellingId == id).Include(v => v.PrijzenPerRang).FirstOrDefaultAsync();

        if (voorstelling == null)
        {
            return NotFound();
        }
        return voorstelling;
    }

    [HttpGet("event/{eventId}")]
    public async Task<ActionResult<VoorstellingEvent>> GetVoorstellingEvent(int eventId)
    {
        var voorstellingEvent = await _context.VoorstellingEvents.Where(v => v.Id == eventId).Include(v => v.Voorstelling).Include(v => v.Voorstelling.PrijzenPerRang).Include(v => v.DatumBereik).FirstOrDefaultAsync();
        
        if (voorstellingEvent == null)
        {
            return NotFound("VoorstellingEvent not found");
        }
        return voorstellingEvent;
    }

    [HttpGet]
    public async Task<ActionResult<List<Voorstelling>>> GetVoorstellingen()
    {
        var voorstellingen = await _context.Voorstellingen.Include(v => v.PrijzenPerRang).ToListAsync();
        if (voorstellingen == null)
        {
            return NotFound();
        }
        return voorstellingen;
    }

    [HttpPost]
    public async Task<ActionResult> PostVoorstelling([FromBody] createVoorstelling created)
    {
        
        Voorstelling voorstelling = new Voorstelling();
        voorstelling.Titel = created.Titel;
        voorstelling.Beschrijving = created.Beschrijving;
        voorstelling.Genre = created.Genre;
        voorstelling.Afbeelding = created.Afbeelding;
        voorstelling.Banner = created.Banner;
        voorstelling.PrijzenPerRang = created.PrijzenPerRang;
        voorstelling.ZaalId = created.ZaalId;
        voorstelling.BegunstigerOnly = created.BegunstigerOnly;
        voorstelling.Leeftijd = created.Leeftijd;


        await _context.Voorstellingen.AddAsync(voorstelling);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Voorstelling>> PutVoorstelling(int id, Voorstelling voorstelling)
    {
        if (id != voorstelling.VoorstellingId)
        {
            return BadRequest();
        }
        _context.Entry(voorstelling).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Voorstelling>> DeleteVoorstelling(int id)
    {
        var voorstelling = await _context.Voorstellingen.FindAsync(id);
        if (voorstelling == null)
        {
            return NotFound();
        }
        _context.Voorstellingen.Remove(voorstelling);
        await _context.SaveChangesAsync();
        return voorstelling;
    }
}

public class createVoorstelling{
    public string Titel { get; set; }
    public string Beschrijving { get; set; }
    public string Genre { get; set; }
    public string Afbeelding { get; set; }
    public string Banner { get; set; }
    public List<RangPrijs> PrijzenPerRang { get; set; }
    public int ZaalId { get; set; }
    public bool BegunstigerOnly { get; set; }
    public int Leeftijd { get; set; }
}