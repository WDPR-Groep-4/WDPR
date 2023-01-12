namespace Backend;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class BetaalController : ControllerBase
{
    private readonly DatabaseContext _context;

    public BetaalController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet("setup")]
    public async Task<ActionResult<string>> SetupBetalingAndGetId(string email, List<WinkelwagenItem> winkelwagenItems)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return BadRequest("Invalid email");
        }

        if (winkelwagenItems.Count == 0 || winkelwagenItems == null)
        {
            return BadRequest("No items in cart");
        }

        Betaling betaling = new Betaling();
        betaling.Email = email;
        betaling.Pending = true;
        betaling.Succes = null;

        await _context.AddAsync(betaling);
        await _context.SaveChangesAsync();

        return betaling.Id.ToString();
    }

    [HttpGet("check")]
    public async Task<ActionResult<bool?>> CheckBetalingSucces(string id)
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
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<IActionResult> Verify()
    {
        //Check origin
        var origin = Request.Headers["Origin"];
        if (origin != "https://fakepay.azurewebsites.net/")
        {
            return BadRequest("Invalid origin");
        }

        //Extract data
        var formData = Request.Form;
        var succes = formData["succes"];
        var reference = formData["reference"];

        //Check of data klopt
        if (succes != "true" && succes != "false")
        {
            return BadRequest("Invalid succes");
        }

        if (string.IsNullOrWhiteSpace(reference))
        {
            return BadRequest("Invalid reference");
        }

        //Get betaling
        Betaling? betaling = await _context.Betalingen.Where(b => b.Id.ToString().Equals(reference)).FirstOrDefaultAsync();

        if (betaling == null)
        {
            return BadRequest("Invalid reference");
        }

        if (!betaling.Pending)
        {
            return BadRequest("Payment already processed");
        }

        if (succes == "true")
        {
            betaling.Succes = true;

            var winkelwagenItems = await _context.Betalingen.Where(w => w.Id.ToString().Equals(reference)).SelectMany(w => w.WinkelwagenItems).ToListAsync();
            if (winkelwagenItems == null || winkelwagenItems.Count == 0)
            {
                return BadRequest("Invalid reference");
            }
            foreach (WinkelwagenItem wItem in winkelwagenItems)
            {
                var voorstellingEvent = await _context.VoorstellingEvents.Where(v => v.Id == wItem.VoorstellingEventId).FirstOrDefaultAsync();
                if (voorstellingEvent == null)
                {
                    return BadRequest("Invalid reference");
                }
                TicketController.GenerateTickets(voorstellingEvent, betaling.Email, wItem.Rang, wItem.Aantal, _context);
            }
        }
        else
        {
            betaling.Succes = false;
        }

        betaling.Pending = false;
        return Ok();
    }
}