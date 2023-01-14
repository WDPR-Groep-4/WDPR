using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using QRCoder;
using Newtonsoft.Json;
using System.Drawing.Imaging;

namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger _logger;

    public TicketController(DatabaseContext context, ILogger<BetaalController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("all_from_single_email")]
    public async Task<ActionResult<List<Ticket>>> GetAllTicketsFromEmail(string email)
    {
        var tickets = await _context.Tickets.Where(t => t.Email == email).Include(t => t.VoorstellingEvent).Include(t => t.VoorstellingEvent.Voorstelling).Include(t => t.VoorstellingEvent.DatumBereik).ToListAsync();
        if (tickets == null)
        {
            return NotFound();
        }
        return tickets;
    }

    [HttpGet("all_from_single_email_and_event")]
    public async Task<ActionResult<Ticket>> GetTicketsOneVoorstellingEventFromEmail([FromBody] int voorstellingId, string email)
    {
        var ticket = await _context.Tickets.Where(t => t.VoorstellingEvent.Id == voorstellingId && t.Email == email).FirstOrDefaultAsync();
        if (ticket == null)
        {
            return NotFound();
        }
        return ticket;
    }

    [HttpGet("all_from_single_event")]
    public async Task<ActionResult<List<Ticket>>> GetAllTicketsFromVoorstellingEvent([FromBody] int eventId)
    {
        var tickets = await _context.Tickets.Where(t => t.VoorstellingEvent.Id == eventId).ToListAsync();
        if (tickets == null)
        {
            return NotFound();
        }
        return tickets;
    }

    [HttpGet("qrcode/{guid}")]
    public async Task<IActionResult> GetQRCode(Guid guid)
    {
        var ticket = _context.Tickets.Where(t => t.TicketId == guid).FirstOrDefault();
        if (ticket == null)
        {
            return NotFound();
        }
        Bitmap qrCodeImage = await GenerateQRCode(guid, _logger);
        using (var stream = new MemoryStream())
        {
            qrCodeImage.Save(stream, ImageFormat.Png);
            return File(stream.ToArray(), "image/png", "qrcode.png");
        }


    }


    public static List<Ticket> GenerateTickets(VoorstellingEvent voorstelling, string email, int rang, int aantal, DatabaseContext context, ILogger logger)
    {
        List<Zaal> items = new List<Zaal>();
        using (StreamReader r = new StreamReader("./Services/zaalConfig.json"))
        {
            string json = r.ReadToEnd();
            items = JsonConvert.DeserializeObject<List<Zaal>>(json);
        }

        int aantalGereserveerdeStoelen = context.Tickets.Where(t => t.VoorstellingEvent.Id == voorstelling.Id).Where(t => t.Rang == rang).Count();
        var aantalRangStoelen = items.Where(z => z.ZaalNummer == voorstelling.Zaal).Select(z => z.Rangen[rang - 1]).FirstOrDefault();

        if (aantalGereserveerdeStoelen + aantal > aantalRangStoelen)
        {
            return null;
        }
        logger.LogInformation(aantal.ToString());

        List<Ticket> tickets = new List<Ticket>();

        for (int i = 0; i < aantal; i++)
        {
            Ticket ticket = new Ticket();
            ticket.VoorstellingEvent = voorstelling;
            ticket.Email = email;
            ticket.Stoel = aantalGereserveerdeStoelen + i + 1;
            ticket.Rang = rang;

            context.AddAsync(ticket);
            context.SaveChangesAsync();

            // email qr
        }


        return tickets;
    }

    public static async Task<Bitmap> GenerateQRCode(Guid guid, ILogger _logger)
    {
        QRCodeGenerator qrGenerator = new QRCodeGenerator();
        QRCodeData qrCodeData = qrGenerator.CreateQrCode(guid.ToString(), QRCodeGenerator.ECCLevel.Q);
        QRCode qrCode = new QRCode(qrCodeData);
        Bitmap qrCodeImage = qrCode.GetGraphic(20);
        return qrCodeImage;
    }
}