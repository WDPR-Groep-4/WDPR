using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace Backend;

[Route("api/[controller]")]
[ApiController]
public class DonatieController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger _logger;
    private readonly UserManager<Gebruiker> _userManager;


    public DonatieController(DatabaseContext context, ILogger<BetaalController> logger, UserManager<Gebruiker> userManager)
    {
        _context = context;
        _logger = logger;
        _userManager = userManager;
    }

    [HttpGet("listener")]
    public async Task<IActionResult> Listener(DonatieListenerDto donatieDto)
    {
        if (donatieDto == null)
        {
            return BadRequest();
        }
        if (donatieDto.Email == null || donatieDto.Hoeveelheid == 0 || donatieDto.Naam == null)
        {
            return BadRequest();
        }
        await _context.AddAsync(new Donatie
        {
            Email = donatieDto.Email,
            Bedrag = donatieDto.Hoeveelheid,
            Naam = donatieDto.Naam
        });
        await _context.SaveChangesAsync();

        var totaal365 = _context.Donaties.Where(d => d.Email == donatieDto.Email && d.Datum > DateTime.Now.AddDays(-365)).Sum(d => d.Bedrag);
        if (totaal365 >= 1000)
        {
            var gebruiker = await _userManager.FindByEmailAsync(donatieDto.Email);
            if (gebruiker == null)
            {
                return NotFound();
            }
            await _userManager.AddToRoleAsync(gebruiker, "Begunstiger");
        }

        return Ok();
    }

    [HttpPost("addtoken")]
    public async Task<IActionResult> AddToken(string token, string email)
    {
        var gebruiker = await _userManager.FindByEmailAsync(email);
        if (gebruiker == null)
        {
            return NotFound();
        }
        gebruiker.DonatieToken = token;
        await _userManager.UpdateAsync(gebruiker);
        return Ok();
    }

    [HttpGet("totaal")]
    public async Task<IActionResult> GetTotaalDonaties(string email)
    {
        var gebruiker = await _userManager.FindByEmailAsync(email);
        if (gebruiker == null)
        {
            return NotFound();
        }
        var totaal = _context.Donaties.Where(d => d.Email == gebruiker.Email).Sum(d => d.Bedrag);
        return Ok(totaal);
    }

    [HttpGet("lastyear")]
    public async Task<IActionResult> GetTotaalLastYear(string email)
    {
        var gebruiker = await _userManager.FindByEmailAsync(email);
        if (gebruiker == null)
        {
            return NotFound();
        }
        var totaal = _context.Donaties.Where(d => d.Email == gebruiker.Email && d.Datum > DateTime.Now.AddDays(-365)).Sum(d => d.Bedrag);
        return Ok(totaal);
    }

    [HttpGet("token")]
    public async Task<IActionResult> GetToken([FromQuery] string email)
    {
        var gebruiker = await _userManager.FindByEmailAsync(email);
        if (gebruiker == null)
        {
            return NotFound();
        }
        if (gebruiker.DonatieToken == null || gebruiker.DonatieToken == "")
        {
            return NotFound("Geen token gevonden");
        }
        return Ok(gebruiker.DonatieToken);
    }
}

public class DonatieListenerDto
{
    public string Email { get; set; }
    public double Hoeveelheid { get; set; }
    public string Naam { get; set; }
}