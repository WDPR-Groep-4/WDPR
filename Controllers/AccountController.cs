using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<Gebruiker> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;


    public AccountController(UserManager<Gebruiker> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    // [HttpGet]
    // public async Task<ActionResult<AccountDTO>> Get()
    // {
    //     var userFromContext = HttpContext.User;
    //     Gebruiker? user = await _userManager.FindByNameAsync(userFromContext.Identity.Name);
    //     if (user == null)
    //     {
    //         return NotFound();
    //     }

    //     AccountDTO accountDTO = new()
    //     {
    //         Voornaam = user.Voornaam,
    //         Achternaam = user.Achternaam,
    //         Email = user.Email
    //     };

    //     return Ok(accountDTO);
    // }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = _userManager.Users.ToList();
        return Ok(users);
    }

    [Authorize]
    [HttpGet]
    [Route("{userId}")]
    public async Task<ActionResult<List<Gebruiker>>> SearchUser([FromRoute] string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            Console.WriteLine("User not found");
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet]
    [Route("{userId}/rol")]
    public async Task<ActionResult<List<Gebruiker>>> UserRol([FromRoute] string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return NotFound();
        }

        var rol = await _userManager.GetRolesAsync(user);
        return Ok(rol);
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
  

//     [HttpGet]
//     [Route("all/")]
//     public async Task<ActionResult<List<Gebruiker>>> GetUsers()
//     {
//     var users = await _context.Gebruikers.ToListAsync();

//     if (users == null)
//     {
//         return NotFound();
//     }

//     return Ok(users);
// }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] createUser gebruiker)
    {
        var user = new Gebruiker { UserName = gebruiker.Email, Email = gebruiker.Email , Voornaam = gebruiker.Voornaam, Achternaam = gebruiker.Achternaam, PhoneNumber = gebruiker.Telefoon};
        var result = await _userManager.CreateAsync(user);

        if (result.Succeeded)
        {
            if (!await _roleManager.RoleExistsAsync(gebruiker.Rol))
            {
                var role = new IdentityRole(gebruiker.Rol);
                await _roleManager.CreateAsync(role);
            }

            await _userManager.AddToRoleAsync(user, gebruiker.Rol);
            return Ok();
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
        {
            return Ok();
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }


    // [HttpPut]
    // public async Task<ActionResult> UpdateUser([FromQuery] string id, [FromBody] String voornaam, String achternaam, String email, String telefoon)
    // {
    //     var user = await _userManager.FindByIdAsync(id);
    //     if (user == null)
    //     {
    //         return NotFound();
    //     }
    //     user.Voornaam = voornaam;
    //     user.Achternaam = achternaam;
    //     user.Email = email;
    //     user.PhoneNumber = telefoon;
    //     await _userManager.UpdateAsync(user);
    //     return Ok();
    // }

}

public class createUser{
    public string Rol {get; set;}
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string Email { get; set; }
    public string Telefoon { get; set; }
    
}

public class AccountDTO
{
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string Email { get; set; }
    public List<Interesse> Interesses { get; set; }
}

