using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<Gebruiker> _userManager;

    public AccountController(UserManager<Gebruiker> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<AccountDTO>> Get()
    {
        var userFromContext = HttpContext.User;
        Gebruiker? user = await _userManager.FindByNameAsync(userFromContext.Identity.Name);
        if (user == null)
        {
            return NotFound();
        }

        AccountDTO accountDTO = new()
        {
            Voornaam = user.Voornaam,
            Achternaam = user.Achternaam,
            Email = user.Email
        };

        return Ok(accountDTO);
    }

}

public class AccountDTO
{
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string Email { get; set; }
}

