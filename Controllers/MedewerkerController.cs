using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Medewerker, Administrator")]
    public class MedewerkerController : ControllerBase
    {
        private readonly DatabaseContext _context;
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }
        
     [HttpGet]
    public async Task<ActionResult<Gebruiker>> SearchUser([FromBody] String userId)
    {
        var user = await _context.Gebruikers.FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            return NotFound();
        }
        user.

        return user;
    }

    [HttpPost]
    public async Task<ActionResult<Gebruiker>> AddUser(String voornaam, String achternaam){
        var user = 

    }


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
        */

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
