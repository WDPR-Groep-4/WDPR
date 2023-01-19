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


    public MedewerkerController(DatabaseContext context)
    {
        _context = context;
    }

[HttpGet]
[Route("voorstelling/")]
public async Task<ActionResult<Voorstelling>> GetShows()
{
    var shows = await _context.Voorstellingen.ToListAsync();
    if (shows == null)
    {
        return NotFound();
    }
    return Ok(shows);
}

[HttpGet]
[Route("accounts/{userId}")]
public async Task<ActionResult<List<Gebruiker>>> SearchUser([FromRoute] string userId)
{
    var user = await _context.Gebruikers.FirstOrDefaultAsync(u => u.Id == userId);

    if (user == null)
    {
        Console.WriteLine("User not found");
        return NotFound();
    }
    return Ok(user);
}



[HttpPost]
[Route("accounts/add/")]
public async Task<ActionResult> AddUser([FromBody] createUser created)
{
    Gebruiker gebruiker = new Gebruiker();
    gebruiker.Voornaam = created.Voornaam;
    gebruiker.Achternaam = created.Achternaam;
    gebruiker.Email = created.Email;
    gebruiker.PhoneNumber = created.Telefoon;
    await _context.Gebruikers.AddAsync(gebruiker);
    await _context.SaveChangesAsync();
    return Ok();
}

[HttpDelete]
[Route("accounts/delete/")]
public async Task<ActionResult> DeleteUsers([FromQuery] string[] ids)
{   
    foreach (string id in ids) 
    {
        var gebruiker = await _context.Gebruikers.FindAsync(id);
        if (gebruiker == null)
        {
            return NotFound();
        }
         _context.Gebruikers.Remove(gebruiker);
         await _context.SaveChangesAsync();

        
    }
    await _context.SaveChangesAsync();
    return Ok();
}


[HttpPut]
[Route("accounts/update/")]
public async Task<ActionResult> UpdateUser([FromQuery] string id, [FromBody] String voornaam, String achternaam, String email, String telefoon)
{
    var user = await _context.Gebruikers.FirstOrDefaultAsync(u => u.Id == id);
    if (user == null)
    {
        return NotFound();
    }
    user.Voornaam = voornaam;
    user.Achternaam = achternaam;
    user.Email = email;
    user.PhoneNumber = telefoon;
    await _context.SaveChangesAsync();
    return Ok();
}

[HttpGet]
public async Task<ActionResult<List<Gebruiker>>> GetUsers()
{
    var users = await _context.Gebruikers.ToListAsync();

    if (users == null)
    {
        return NotFound();
    }

    return Ok(users);
}
}

public class createUser{
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string Email { get; set; }
    public string Telefoon { get; set; }
}
