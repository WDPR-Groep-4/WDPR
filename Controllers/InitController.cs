using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet]
    public Task PopulateEventDatabase()
    {
        List<Voorstelling> voorstellingen = _context.Voorstellingen.ToList();

        foreach (Voorstelling voorstelling in voorstellingen)
        {
            for (int i = 0; i < 5; i++)
            {
                int zaal = _random.Next(1, 4);
                VoorstellingEvent voorstellingEvent = new VoorstellingEvent
                {
                    Voorstelling = voorstelling,
                    Zaal = zaal,
                    DatumBereik = new DatumBereik
                    {
                        Van = RandomDay(),
                        Tot = RandomDay()
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

}