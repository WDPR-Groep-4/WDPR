using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet("email")]
    public async Task<ActionResult<List<Ticket>>> GetAllTicketsFromEmail(string email)
    {
        var tickets = await _context.Tickets.Where(t => t.Email == email).ToListAsync();
        if (tickets == null)
        {
            return NotFound();
        }
        return tickets;
    }

    [HttpGet("voorstelling")]
    public async Task<ActionResult<Ticket>> GetTicketsOneVoorstellingEventFromEmail(int voorstellingId, string email)
    {
        var ticket = await _context.Tickets.Where(t => t.VoorstellingEvent.Id == voorstellingId && t.Email == email).FirstOrDefaultAsync();
        if (ticket == null)
        {
            return NotFound();
        }
        return ticket;
    }

    [HttpGet("voorstelling")]
    public async Task<ActionResult<List<Ticket>>> GetAllTicketsFromVoorstellingEvent(int eventId)
    {
        var tickets = await _context.Tickets.Where(t => t.VoorstellingEvent.Id == eventId).ToListAsync();
        if (tickets == null)
        {
            return NotFound();
        }
        return tickets;
    }
}