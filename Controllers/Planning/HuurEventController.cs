using Microsoft.AspNetCore.Mvc;

namespace Backend;

[ApiController]
[Route("[controller]")]
public class HuurEventController : ControllerBase
{
    private readonly ILogger<HuurEventController> _logger;
    private readonly DatabaseContext _context;

    public HuurEventController(ILogger<HuurEventController> logger, DatabaseContext databaseContext)
    {
        _logger = logger;
        _context = databaseContext;
    }

    [HttpPost]
    public async Task<IActionResult> HuurZaal(HuurEventDto huurEventDto)
    {
        if (huurEventDto.ZaalId < 1 || huurEventDto.ZaalId > 4)
        {
            return BadRequest("Incorrect zaalid");
        }

    }

}

public class HuurEventDto
{
    public string Email { get; set; }
    public DatumBereik DatumBereik { get; set; }
    public int ZaalId { get; set; }
}