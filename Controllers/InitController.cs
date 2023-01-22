using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Backend;

[ApiController]
[Route("api/[controller]")]
public class InitController : ControllerBase
{
    private readonly DatabaseContext _context;
    private static readonly Random _random = new Random();
    private readonly ILogger<InitController> _logger;


    public InitController(DatabaseContext context, ILogger<InitController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // random date generator in future
    public static DateTime RandomDay()
    {
        DateTime start = DateTime.Today;
        int range = (DateTime.Today.AddYears(1) - start).Days;
        return start.AddDays(_random.Next(range));
    }

    [Authorize(Roles = "Administrator")]
    [HttpGet]
    public Task PopulateEventDatabase()
    {
        List<Voorstelling> voorstellingen = _context.Voorstellingen.ToList();

        foreach (Voorstelling voorstelling in voorstellingen)
        {
            for (int i = 0; i < 5; i++)
            {
                int zaal = _random.Next(1, 4);
                DateTime datum = RandomDay();

                VoorstellingEvent voorstellingEvent = new VoorstellingEvent
                {
                    Voorstelling = voorstelling,
                    Zaal = zaal,
                    DatumBereik = new DatumBereik
                    {
                        Van = datum,
                        Tot = datum.AddHours(2)
                    }
                };
                var result = _context.Events.Add(voorstellingEvent);

                if (result.State == EntityState.Added)
                {
                    _context.SaveChanges();
                    _logger.LogInformation("Added event to database " + voorstellingEvent.Id);
                }
            }
        }

        return Task.CompletedTask;
    }

    [Authorize(Roles = "Administrator")]
    [HttpGet("clear")]
    public Task ClearEventDatabase()
    {
        _context.Events.RemoveRange(_context.Events);
        _context.SaveChanges();
        return Task.CompletedTask;
    }

}