using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using QRCoder;
using Newtonsoft.Json;

namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly DatabaseContext _context;

    public TicketController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet("all_from_single_email")]
    public async Task<ActionResult<List<Ticket>>> GetAllTicketsFromEmail(string email)
    {
        var tickets = await _context.Tickets.Where(t => t.Email == email).ToListAsync();
        if (tickets == null)
        {
            return NotFound();
        }
        return tickets;
    }

    [HttpGet("all_from_single_email_and_event")]
    public async Task<ActionResult<Ticket>> GetTicketsOneVoorstellingEventFromEmail(int voorstellingId, string email)
    {
        var ticket = await _context.Tickets.Where(t => t.VoorstellingEvent.Id == voorstellingId && t.Email == email).FirstOrDefaultAsync();
        if (ticket == null)
        {
            return NotFound();
        }
        return ticket;
    }

    [HttpGet("all_from_single_event")]
    public async Task<ActionResult<List<Ticket>>> GetAllTicketsFromVoorstellingEvent(int eventId)
    {
        var tickets = await _context.Tickets.Where(t => t.VoorstellingEvent.Id == eventId).ToListAsync();
        if (tickets == null)
        {
            return NotFound();
        }
        return tickets;
    }



    // import config v
    // Linq query hoeveel plekken binnen rang over zijn v
    // groter dan aantal 

    public static List<Ticket> GenerateTickets(VoorstellingEvent voorstelling, string email, int rang, int aantal, DatabaseContext context)
    {
        List<Zaal> items = new List<Zaal>();
        using (StreamReader r = new StreamReader("../Services/zaalConfig.json"))
        {
            string json = r.ReadToEnd();
            items = JsonConvert.DeserializeObject<List<Zaal>>(json);
        }

        //check existing tickets for free seats
        int aantalGereserveerdeStoelen = context.Tickets.Where(t => t.VoorstellingEvent.Id == voorstelling.Id && RangRijStoelDeformatter(t.RangStoel).Item1 == rang).Count();
        var aantalRangStoelen = items.Where(z => z.ZaalNummer == voorstelling.Zaal).Select(z => z.Rangen[rang - 1]).FirstOrDefault();

        if (aantalGereserveerdeStoelen + aantal > aantalRangStoelen)
        {
            return null;
        }

        List<Ticket> tickets = new List<Ticket>();

        for (int i = 0; i < aantal; i++)
        {
            Ticket ticket = new Ticket();
            ticket.VoorstellingEvent = voorstelling;
            ticket.Email = email;
            ticket.RangStoel = RangRijStoelFormatter(rang, aantalGereserveerdeStoelen + i + 1);

            context.AddAsync(ticket);
            context.SaveChangesAsync();

            // email qr
        }


        return tickets;
    }

    public static Bitmap GenerateQRCode(Guid guid)
    {
        QRCodeGenerator qrGenerator = new QRCodeGenerator();
        QRCodeData qrCodeData = qrGenerator.CreateQrCode(guid.ToString(), QRCodeGenerator.ECCLevel.Q);
        QRCode qrCode = new QRCode(qrCodeData);
        Bitmap qrCodeImage = qrCode.GetGraphic(20);
        return qrCodeImage;
    }

    private static string RangRijStoelFormatter(int rang, int stoel)
    {
        return $"{rang}-{stoel}";
    }

    private static (int, int) RangRijStoelDeformatter(string rangstoel)
    {
        var rangstoelSplit = rangstoel.Split('-');
        return (int.Parse(rangstoelSplit[0]), int.Parse(rangstoelSplit[1]));
    }
}