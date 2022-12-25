using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend;

[Route("api/[controller]")]
[ApiController]
public class EmailController : ControllerBase
{
    private UserManager<Gebruiker> _userManager;
    private readonly ILogger _logger;

    public EmailController(UserManager<Gebruiker> userManager, ILogger<EmailController> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }


}

