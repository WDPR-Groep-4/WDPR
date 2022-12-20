using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

public class GebruikerRegistreer
{
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; init; }
    [Required(ErrorMessage = "Voornaam is required")]
    public string? Voornaam { get; init; }
    [Required(ErrorMessage = "Achternaam is required")]
    public string? Achternaam { get; init; }
    [Required(ErrorMessage = "Geboortedatum is required")]
    public string? Geboortedatum { get; init; }
}

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<Gebruiker> _userManager;
    private readonly SignInManager<Gebruiker> _signInManager;

    public AuthController(UserManager<Gebruiker> userManager, SignInManager<Gebruiker> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost]
    [Route("registreer")]
    public async Task<ActionResult<Gebruiker>> Registreer([FromBody] GebruikerRegistreer gebruikerRegistreer)
    {
        var gebruiker = new Gebruiker
        {
            UserName = gebruikerRegistreer.Email,
            Email = gebruikerRegistreer.Email,
            Voornaam = gebruikerRegistreer.Voornaam,
            Achternaam = gebruikerRegistreer.Achternaam,
            Geboortedatum = gebruikerRegistreer.Geboortedatum
        };
        var resultaat = await _userManager.CreateAsync(gebruiker, gebruikerRegistreer.Password);
        return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] GebruikerLogin gebruikerLogin)
    {
        var _user = await _userManager.FindByEmailAsync(gebruikerLogin.Email);
        if (_user != null)
            if (await _userManager.CheckPasswordAsync(_user, gebruikerLogin.Password))
            {
                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));

                var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, _user.UserName) };
                var roles = await _userManager.GetRolesAsync(_user);
                foreach (var role in roles)
                    claims.Add(new Claim(ClaimTypes.Role, role));
                var tokenOptions = new JwtSecurityToken
                (
                    issuer: "https://localhost:7047",
                    audience: "https://localhost:7047",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: signingCredentials
                );
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
            }

        return Unauthorized();
    }
}

public class GebruikerLogin
{
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; init; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }
}