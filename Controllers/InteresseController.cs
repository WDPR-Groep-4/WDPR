using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Data;
using Microsoft.EntityFrameworkCore;



namespace Backend;


[ApiController]
[Route("api/[controller]")]
public class InteresseController : ControllerBase{
       private readonly UserManager<Gebruiker> _userManager;
    private readonly SignInManager<Gebruiker> _signInManager;
    private readonly IEmailSender _emailSender;
    private readonly ILogger _logger;
    private readonly DatabaseContext _context;
    public InteresseController(DatabaseContext context){
        _context = context;
    }
    [HttpGet]
     public async Task<ActionResult<List<Interesse>>> GetInteresses()
    {
        var interesses = await _context.Interesses.ToListAsync();
        return interesses;
    }
    
    [HttpPost("AddInteresse")]
    public async Task<ActionResult<Interesse>> PostInteresse([FromBody] Interest interesse){
        var newInteresse = new Interesse{
            InteresseNaam = interesse.InterestNaam
        };
        Console.WriteLine(newInteresse.InteresseNaam);
        _context.Interesses.Add(newInteresse);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetInteresse", new {id = newInteresse.Id}, newInteresse);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> PutInteresse(int id, Interesse interesse){
        if(id != interesse.Id){
            return BadRequest();
        }
        _context.Entry(interesse).State = EntityState.Modified;
        try{
            await _context.SaveChangesAsync();
        }
        catch(DbUpdateConcurrencyException){
            if(!InteresseExists(id)){
                return NotFound();
            }
            else{
                throw;
            }
        }
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInteresse(int id){
        var interesse = await _context.Interesses.FindAsync(id);
        if(interesse == null){
            return NotFound();
        }
        _context.Interesses.Remove(interesse);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    private bool InteresseExists(int id){
        return _context.Interesses.Any(e => e.Id == id);
    }
   
    public class Interest{
        public string  InterestNaam {get; set;}
}
}