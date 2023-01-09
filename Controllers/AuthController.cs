using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

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
}

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<Gebruiker> _userManager;
    private readonly SignInManager<Gebruiker> _signInManager;
    private readonly IEmailSender _emailSender;
    private readonly ILogger _logger;

    public AuthController(UserManager<Gebruiker> userManager, SignInManager<Gebruiker> signInManager, IEmailSender emailSender, ILogger<AuthController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _emailSender = emailSender;
        _logger = logger;
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
        };
        var resultaat = await _userManager.CreateAsync(gebruiker, gebruikerRegistreer.Password);

        if (resultaat.Succeeded)
        {
            await _userManager.AddToRoleAsync(gebruiker, "Gebruiker");
            await sendConfirmationEmail(gebruiker);

            return StatusCode(201);
        }


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
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signingCredentials
                );
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
            }

        return Unauthorized();
    }

    public async Task<ActionResult> sendConfirmationEmail(Gebruiker gebruiker)
    {
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(gebruiker);
        _logger.LogInformation("Token: " + token);
        var confirmationLink = Url.Action("ConfirmEmail", "bevestig", new { userId = gebruiker.Id, token = token }, Request.Scheme);
        await _emailSender.SendEmailAsync(gebruiker.Email, "Bevestig uw email", confirmationLink);
        return Ok();
    }

    [HttpPost]
    [Route("bevestig")]
    public async Task<ActionResult> ConfirmEmail([FromBody] ConfirmEmailDTO confirmEmailDTO)
    {
        var user = await _userManager.FindByIdAsync(confirmEmailDTO.userId);
        if (user == null)
        {
            return NotFound();
        }

        var result = await _userManager.ConfirmEmailAsync(user, confirmEmailDTO.Token);
        if (result.Succeeded)
        {
            _logger.LogInformation("Email bevestigd");
            return Ok();
        }

        return BadRequest();
    }

    [HttpPost]
    [Route("wachtwoordvergeten")]
    public async Task<IActionResult> WachtwoordVergeten(Email email)
    {
        var gebruiker = await _userManager.FindByEmailAsync(email.email);
        if (gebruiker == null)
            return NotFound();
        var token = await _userManager.GeneratePasswordResetTokenAsync(gebruiker);
        _logger.LogInformation("Token: " + token);
        var resetLink = Url.Action("resetwachtwoord", "reset", new { email = gebruiker.Email, token = token }, Request.Scheme);
        await _emailSender.SendEmailAsync(gebruiker.Email, "Reset uw wachtwoord", resetLink);
        return Ok();
    }

    [HttpPost]
    [Route("resetwachtwoord")]
    public async Task<ActionResult> ResetWachtwoord([FromBody] ResetWachtwoordDTO resetWachtwoordDTO)
    {
        var gebruiker = await _userManager.FindByEmailAsync(resetWachtwoordDTO.email);
        if (gebruiker == null)
        {
            return NotFound();
        }

        var result = await _userManager.ResetPasswordAsync(gebruiker, resetWachtwoordDTO.Token, resetWachtwoordDTO.NewPassword);
        if (result.Succeeded)
        {
            _logger.LogInformation("Wachtwoord gereset");
            return Ok();
        }

        return BadRequest();
    }


}

public class GebruikerLogin
{
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; init; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }
}

public class ConfirmEmailDTO
{
    public string userId { get; set; }
    public string Token { get; set; }
}

public class ResetWachtwoordDTO
{
    public string email { get; set; }
    public string NewPassword { get; set; }
    public string Token { get; set; }
}

public class Email
{
    public string email { get; set; }
}