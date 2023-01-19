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

/*
[HttpPost]
[Route("accounts/add/")]
public async Task<ActionResult<Gebruiker>> AddUser(Gebruiker gebruiker)
{
    await _context.Gebruikers.AddAsync(gebruiker);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(SearchUser), new { id = gebruiker.Id }, gebruiker);
}


[HttpDelete]
[Route("accounts/{id}")]
public async Task<ActionResult<Gebruiker>> DeleteUser(String id)
{
    var user = await _context.Gebruikers.FirstOrDefaultAsync(u => u.Id == id);

    if (user == null)
    {
        return NotFound();
    }

    _context.Gebruikers.Remove(user);
    await _context.SaveChangesAsync();

    return user;
}

[HttpPut]
[Route("accounts/{id}")]
public async Task<ActionResult<Gebruiker>> UpdateUser(string id, Gebruiker gebruiker)
{
    if (id != gebruiker.Id)
    {
        return BadRequest();
    }
    _context.Entry(gebruiker).State = EntityState.Modified;
    await _context.SaveChangesAsync();
    return gebruiker;
}






{
    var user = await _context.Gebruikers.FirstOrDefaultAsync(u => u.Id == userId);

    if (user == null)
    {
        return NotFound();
    }

    return user;
}


[HttpGet]
public async Task<ActionResult<IEnumerable<Gebruiker>>> Search(string id, string voornaam, string achternaam)
{
    var users = _context.Gebruikers.AsQueryable();

    if (!string.IsNullOrEmpty(id))
    {
        users = users.Where(u => u.Id == id);
    }

    if (!string.IsNullOrEmpty(voornaam))
    {
        users = users.Where(u => u.Voornaam.Contains(voornaam));
    }

    if (!string.IsNullOrEmpty(achternaam))
    {
        users = users.Where(u => u.Achternaam.Contains(achternaam));
    }

    return await users.ToListAsync();
}
*/



    /*
    [Route("[action]")]
    [HttpPost]
    public void PostVoorstelling([FromBody] Voorstelling voorstelling)
    {
        var showCheck= _context.Voorstellingen.FirstOrDefault(v=>v.VoorstellingId==voorstelling.VoorstellingId);
        if (voorstelling == null)
        {
        var _voorstelling= new Voorstelling{
            VoorstellingId=voorstelling.VoorstellingId,
            Titel=voorstelling.Titel,
            Beschrijving=voorstelling.Beschrijving,
            DatumBereiken=voorstelling.DatumBereiken,
            Duur=voorstelling.Duur,
            Leeftijd=voorstelling.Leeftijd,
            Genre=voorstelling.Genre,
            Afbeelding=voorstelling.Afbeelding,
            Banner=voorstelling.Banner,
            Prijs=voorstelling.Prijs,
            ZaalId=voorstelling.ZaalId
        };
        _context.Voorstellingen.Add(_voorstelling);
        _context.SaveChanges();
        }
        else{
            throw new ArgumentNullException(nameof(voorstelling));
        }
        
    }
    

    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
    */
}

public class createUser{
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string Email { get; set; }
    public string Telefoon { get; set; }
}
