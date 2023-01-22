using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Linq;

namespace  Backend;
[Route("api/[controller]")]
[ApiController]
public class HomePageController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;
        public HomePageController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        [HttpGet]
        [Route("GetRandomVoorstellingen")]
        public async Task<ActionResult<List<Voorstelling>>> GetDisinctRandomVoorstellingen()
        {
            var voorstellingen = await _databaseContext.Voorstellingen.ToListAsync();
            var random = new Random();
          var randomVoorstellingen = await _databaseContext.Voorstellingen
                                            .OrderBy(x => EF.Functions.Random())
                                            .Take(4)
                                            .ToListAsync();
            return randomVoorstellingen;
        }
        
    }

    public class VoorstellingDTO{
        public int VoorstellingId { get; set; }
        public string Titel { get; set; }
        public string Beschrijving { get; set; }
        public string Afbeelding { get; set; }
        public string Genre { get; set; }
        public string Speelduur { get; set; }
        public string Leeftijd { get; set; }

    }