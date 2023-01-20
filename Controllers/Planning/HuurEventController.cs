using Microsoft.AspNetCore.Mvc;

namespace Backend;

[ApiController]
[Route("[controller]")]
public class HuurEventController : ControllerBase
{
    private readonly ILogger<HuurEventController> _logger;
    private readonly DatabaseContext _context;

    public HuurEventController(ILogger<HuurEventController> logger, DatabaseContext databaseContext)
    {
        _logger = logger;
        _context = databaseContext;
    }

    [HttpPost]
    public async Task<IActionResult> HuurZaal(HuurEventDto huurEventDto)
    {
        if (huurEventDto.AantalUren < 1 || huurEventDto.AantalUren > 8)
        {
            return BadRequest("Incorrect aantal uren");
        }
        if (huurEventDto.ZaalId < 1 || huurEventDto.ZaalId > 4)
        {
            return BadRequest("Incorrect zaalid");
        }
        if (huurEventDto.Start < DateTime.Now)
        {
            return BadRequest("Start is al geweest");
        }

        var verhuurEvent = new VerhuurEvent
        {
            Eigenaar = huurEventDto.Email,
            Zaal = huurEventDto.ZaalId,
            DatumBereik = new DatumBereik
            {
                Van = huurEventDto.Start,
                Tot = huurEventDto.Start.AddHours(huurEventDto.AantalUren)
            }
        };
        
        DatumBereik datumBereik = new DatumBereik
        {
            Van = huurEventDto.Start,
            Tot = huurEventDto.Start.AddHours(huurEventDto.AantalUren)
        };

        if (!PlanningUtils.IsDatumVrij(verhuurEvent.DatumBereik, verhuurEvent.Zaal, _context))
        {
            return BadRequest("Datum en/of zaal is niet beschikbaar");
        }

        await _context.Events.AddAsync(verhuurEvent);
        await _context.SaveChangesAsync();
        return Ok();
    }

}

public class HuurEventDto
{
    public string Email { get; set; }
    public DateTime Start { get; set; }
    public int AantalUren { get; set; }
    public int ZaalId { get; set; }
}