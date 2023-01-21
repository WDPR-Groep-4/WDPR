using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

    [Authorize]
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
    /*
    [HttpPut]
    public async Task<ActionResult<List<InteresseGast>>> putInteresse([FromBody] List<InteresseGast> interesseGasten)
    {
        var userFromContext = HttpContext.User;
        Gebruiker? user = await _userManager.FindByNameAsync(userFromContext.Identity.Name);
        if (user == null)
        {
            return NotFound();
        }

        List<Interesse> interesses = new();
        foreach (var interesseGast in interesseGasten)
        {
            Interesse interesse = new()
            {
                Naam = interesseGast.Naam,
                Beschrijving = interesseGast.Beschrijving,
                Gebruiker = user
            };
            interesses.Add(interesse);
        }

        user.Interesses = interesses;
        await _userManager.UpdateAsync(user);

        return Ok(interesseGasten);
    }
    */
  

}

public class AccountDTO
{
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string Email { get; set; }
    public List<Interesse> Interesses { get; set; }
}

