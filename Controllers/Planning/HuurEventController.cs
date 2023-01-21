using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class HuurEventController : ControllerBase
{
    private readonly ILogger<HuurEventController> _logger;
    private readonly DatabaseContext _context;
    private readonly UserManager<Gebruiker> _userManager;

    public HuurEventController(ILogger<HuurEventController> logger, DatabaseContext databaseContext, UserManager<Gebruiker> userManager)
    {
        _logger = logger;
        _context = databaseContext;
        _userManager = userManager;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> HuurZaal(HuurEventDto huurEventDto)
    {
        var userFromContext = HttpContext.User;
        Gebruiker? user = await _userManager.FindByNameAsync(userFromContext.Identity.Name);

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
            Eigenaar = user.Email,
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

        _logger.LogInformation("Event booked door {0} op {1}", user.Email, DateTime.Now);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> IsVrij([FromQuery] HuurEventDto huurEventDto)
    {

        DatumBereik bereik = new DatumBereik
        {
            Van = huurEventDto.Start,
            Tot = huurEventDto.Start.AddHours(huurEventDto.AantalUren)
        };

        if (!PlanningUtils.IsDatumVrij(bereik, huurEventDto.ZaalId, _context))
        {
            return BadRequest("Datum en/of zaal is niet beschikbaar");
        }

        return Ok();
    }


    [Authorize]
    [HttpGet("all_from_single_email")]
    public async Task<ActionResult<List<VerhuurEvent>>> GetAllHuurEventsFromEmail()
    {
        var userName = User.Identity.Name;
        var user = await _userManager.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound();
        }

        var events = await _context.VerhuurEvents.Where(e => e.Eigenaar == user.Email).Include(e => e.DatumBereik).ToListAsync();
        if (events == null)
        {
            return NotFound();
        }
        return events;
    }

}

public class HuurEventDto
{
    public DateTime Start { get; set; }
    public int AantalUren { get; set; }
    public int ZaalId { get; set; }
}