using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

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

    [HttpPost("listener")]
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
                return NotFound("Gebruiker niet gevonden");
            }
            await _userManager.AddToRoleAsync(gebruiker, "Begunstiger");
        }

        return Ok();
    }

    [HttpPost("addtoken")]
    public async Task<IActionResult> AddToken([FromForm] string token)
    {
        if (token == null)
        {
            return BadRequest();
        }
        var handler = new JwtSecurityToken(jwtEncodedString: token);
        string email = handler.Claims.First(claim => claim.Type == "Email").Value;

        var gebruiker = await _userManager.FindByEmailAsync(email);
        if (gebruiker == null)
        {
            return NotFound("Gebruiker niet gevonden");
        }

        gebruiker.DonatieToken = token;
        await _userManager.UpdateAsync(gebruiker);

        _logger.LogInformation("Donatie token toegevoegd aan gebruiker " + gebruiker.Email);

        return Ok();
    }

    [HttpGet("totaal")]
    public async Task<IActionResult> GetTotaalDonaties([FromQuery] string email)
    {
        var gebruiker = await _userManager.FindByEmailAsync(email);
        if (gebruiker == null)
        {
            return NotFound("Gebruiker niet gevonden");
        }
        var totaal = _context.Donaties.Where(d => d.Email == gebruiker.Email).Sum(d => d.Bedrag);
        return Ok(totaal);
    }

    [HttpGet("lastyear")]
    public async Task<IActionResult> GetTotaalLastYear([FromQuery] string email)
    {
        var gebruiker = await _userManager.FindByEmailAsync(email);
        if (gebruiker == null)
        {
            return NotFound("Gebruiker niet gevonden");
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
            return NotFound("Gebruiker niet gevonden");
        }

        if (gebruiker.DonatieToken == null || gebruiker.DonatieToken == "")
        {
            return Ok("null");
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