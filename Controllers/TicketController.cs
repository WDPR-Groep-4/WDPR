using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QRCoder;
using Newtonsoft.Json;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Drawing.Processing;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.Fonts;
using SixLabors.ImageSharp.Formats.Png;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger _logger;
    private readonly IEmailSender _emailSender;

    public TicketController(DatabaseContext context, ILogger<BetaalController> logger, IEmailSender emailSender)
    {
        _context = context;
        _logger = logger;
        _emailSender = emailSender;
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
        var ticket = _context.Tickets.Where(t => t.TicketId == guid).Include(t => t.VoorstellingEvent).Include(t => t.VoorstellingEvent.Voorstelling).Include(t => t.VoorstellingEvent.DatumBereik).FirstOrDefault();
        if (ticket == null)
        {
            return NotFound();
        }
        Image qrCodeImage = await GenerateTicketImage(ticket);
        using (var stream = new MemoryStream())
        {
            qrCodeImage.Save(stream, new PngEncoder());
            return File(stream.ToArray(), "image/png", "qrcode.png");
        }


    }


    public List<Ticket> GenerateTickets(VoorstellingEvent voorstelling, string email, int rang, int aantal, DatabaseContext context, ILogger logger)
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
        Dictionary<Image, string> ticketImages = new Dictionary<Image, string>();

        for (int i = 0; i < aantal; i++)
        {
            Ticket ticket = new Ticket();
            ticket.VoorstellingEvent = voorstelling;
            ticket.Email = email;
            ticket.Stoel = aantalGereserveerdeStoelen + i + 1;
            ticket.Rang = rang;

            context.AddAsync(ticket);
            context.SaveChangesAsync();

            ticketImages.Add(GenerateTicketImage(ticket).Result, ticket.TicketId.ToString());
        }

        _emailSender.SendEmailAsync(email, "Tickets voor " + voorstelling.Voorstelling.Titel, "Uw tickets zijn aangemaakt. U kan ze hieronder downloaden.", ticketImages).Wait();

        return tickets;
    }
    public async Task<Image<Rgba32>> GenerateTicketImage(Ticket ticket)
    {
        QRCodeGenerator qrGenerator = new QRCodeGenerator();
        QRCodeData qrCodeData = qrGenerator.CreateQrCode(ticket.TicketId.ToString(), QRCodeGenerator.ECCLevel.Q);
        QRCode qrCode = new QRCode(qrCodeData);

        FontCollection fonts = new FontCollection();
        FontFamily family = fonts.Add("./Alexandria-Medium.ttf");

        Font font = family.CreateFont(26, FontStyle.Regular);


        Image qrCodeImage = new QRCoder.QRCode(qrCodeData).GetGraphic(20, "#ffffff", "#4682B4");
        Image<Rgba32> ticketImage = new Image<Rgba32>(820, 1100);
        ticketImage.Mutate(x => x.BackgroundColor(Rgba32.ParseHex("#4682B4")));
        ticketImage.Mutate(x => x.DrawText("Voorstelling: " + ticket.VoorstellingEvent.Voorstelling.Titel, font, Rgba32.ParseHex("#ffffff"), new PointF(90, 830)));
        ticketImage.Mutate(x => x.DrawText("Datum: " + ticket.VoorstellingEvent.DatumBereik.Van.ToString("dd/MM/yyyy"), font, Rgba32.ParseHex("#ffffff"), new PointF(90, 900)));
        ticketImage.Mutate(x => x.DrawText("Tijd: " + ticket.VoorstellingEvent.DatumBereik.Van.ToString("HH:mm" + "-" + ticket.VoorstellingEvent.DatumBereik.Tot.ToString("HH:mm")), font, Rgba32.ParseHex("#ffffff"), new PointF(90, 970)));
        ticketImage.Mutate(x => x.DrawText("Rang: " + ticket.Rang, font, Rgba32.ParseHex("#ffffff"), new PointF(600, 900)));
        ticketImage.Mutate(x => x.DrawText("Stoel: " + ticket.Stoel, font, Rgba32.ParseHex("#ffffff"), new PointF(600, 970)));
        ticketImage.Mutate(x => x.DrawImage(qrCodeImage, new Point(0, 0), 1));

        return ticketImage;
    }
}