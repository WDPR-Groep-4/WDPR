using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Produces("application/json")]
public class MedewerkerController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger _logger;


    public MedewerkerController(DatabaseContext context, ILogger<MedewerkerController> logger)
    {
        _context = context;
        _logger = logger;
    }
    
}
