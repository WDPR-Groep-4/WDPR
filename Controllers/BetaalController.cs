namespace Backend;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class BetaalController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger _logger;

    public BetaalController(DatabaseContext context, ILogger<BetaalController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost("setup")]
    public async Task<ActionResult<int>> SetupBetalingAndGetId(BetalingDto betalingDto)
    {
        if (string.IsNullOrWhiteSpace(betalingDto.Email))
        {
            return BadRequest("Invalid email");
        }

        if (betalingDto.WinkelwagenItems.Count == 0 || betalingDto.WinkelwagenItems == null)
        {
            return BadRequest("No items in cart");
        }


        Betaling betaling = new Betaling();
        betaling.Email = betalingDto.Email;
        betaling.Pending = true;
        betaling.Succes = null;
        betaling.WinkelwagenItems = betalingDto.WinkelwagenItems;

        await _context.AddAsync(betaling);
        await _context.SaveChangesAsync();

        return betaling.Id;
    }

    [Authorize(Roles = "Administrator")]
    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteAllBetalingen()
    {
        _context.Betalingen.RemoveRange(_context.Betalingen);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("check")]
    public async Task<ActionResult<bool?>> CheckBetalingSucces(int id)
    {
        Betaling? betaling = await _context.Betalingen.Where(b => b.Id.ToString().Equals(id)).FirstOrDefaultAsync();
        if (betaling == null)
        {
            return NotFound();
        }
        if (betaling.Pending)
        {
            bool? result = null;
            return result;
        }
        return betaling.Succes;
    }

    [HttpPost("verify")]
    public async Task<IActionResult> Verify(VerifyDto verifyDto)
    {

        // var origin = Request.Headers["Origin"];
        // if (!(origin.Equals("https://localhost:44419") || origin.Equals("https://hettheaterlaak.nl")))
        // {
        //     return BadRequest("Invalid origin");
        // }

        bool succes = verifyDto.succes;
        int reference = verifyDto.reference;

        //Get betaling  
        Betaling? betaling = await _context.Betalingen.Where(b => b.Id == reference).FirstOrDefaultAsync();

        if (betaling == null)
        {
            return BadRequest("Betaling null");
        }

        if (!betaling.Pending)
        {
            return BadRequest("Payment already processed");
        }

        _logger.LogWarning("Succes: " + succes);

        if (succes == true)
        {
            betaling.Succes = true;

            var winkelwagenItems = await _context.Betalingen.Where(w => w.Id == reference).SelectMany(w => w.WinkelwagenItems).ToListAsync();
            if (winkelwagenItems == null || winkelwagenItems.Count == 0)
            {
                return BadRequest("No items in cart");
            }
            foreach (WinkelwagenItem wItem in winkelwagenItems)
            {
                var voorstellingEvent = await _context.VoorstellingEvents.Where(v => v.Id == wItem.VoorstellingEventId).Include(v => v.Voorstelling).Include(v => v.DatumBereik).FirstOrDefaultAsync();
                if (voorstellingEvent == null)
                {
                    return BadRequest("VoorstellingEvent not found");
                }
                TicketController.GenerateTickets(voorstellingEvent, betaling.Email, wItem.Rang, wItem.Aantal, _context, _logger);
            }
        }
        else
        {
            betaling.Succes = false;
            await _context.SaveChangesAsync();
            _logger.LogInformation("Payment processed with id: " + reference);
            return BadRequest("Payment failed (mogelijk niet genoeg saldo)");
        }

        betaling.Pending = false;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Payment processed with id: " + reference);

        return Ok();
    }
}

public class BetalingDto
{
    public string Email { get; set; }
    public List<WinkelwagenItem> WinkelwagenItems { get; set; }
}

public class VerifyDto
{
    public bool succes { get; set; }
    public int reference { get; set; }
}