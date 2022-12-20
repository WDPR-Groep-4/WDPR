using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Backend
{
    public class DatabaseContext : IdentityDbContext<Gebruiker>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }



        public DbSet<Voorstelling> Voorstellingen { get; set; }
        public DbSet<Donatie> Donaties { get; set; }
        //public DbSet<Gebruiker> Gebruikers { get; set; }
        // Medewerkers en Gasten moeten in Gebruiker tabel
        public DbSet<Ticket> Tickets { get; set; }


    }
    
}