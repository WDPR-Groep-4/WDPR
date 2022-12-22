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

}

public class ConfirmEmailDTO
{
    public string userId { get; set; }
    public string Token { get; set; }
}