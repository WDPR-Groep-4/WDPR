namespace Backend;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class BetaalController : ControllerBase
{
    private readonly DatabaseContext _context;

    public BetaalController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet("api/setup")]
    public async Task<ActionResult<int>> SetupBetalingAndGetId(string email)
    {
        Betaling betaling = new Betaling();
        betaling.Email = email;
        betaling.Pending = true;
        betaling.Succes = null;

        await _context.AddAsync(betaling);
        await _context.SaveChangesAsync();

        return betaling.Id;
    }

    [HttpGet("api/check")]
    public async Task<ActionResult<bool?>> CheckBetalingSucces(int id)
    {
        Betaling? betaling = await _context.Betalingen.Where(b => b.Id == id).FirstOrDefaultAsync();
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

        if (!int.TryParse(reference, out int id))
        {
            return BadRequest("Invalid reference");
        }

        //Get betaling
        Betaling? betaling = await _context.Betalingen.Where(b => b.Id == id).FirstOrDefaultAsync();

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

            //Generate tickets
        }
        else
        {
            betaling.Succes = false;
        }

        betaling.Pending = false;
        return Ok();
    }
}