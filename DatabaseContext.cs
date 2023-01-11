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
        public DbSet<Gebruiker> Gebruikers { get; set; }
        public DbSet<Gast> Gasten { get; set; }
        public DbSet<Medewerker> Medewerkers { get; set; }
        // Medewerkers en Gasten moeten in Gebruiker tabel
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<PlanningEvent> Events { get; set; }
        public DbSet<VerhuurEvent> VerhuurEvents { get; set; }
        public DbSet<VoorstellingEvent> VoorstellingEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Voorstelling>()
                .HasMany(v => v.PrijzenPerRang)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<PlanningEvent>()
                .HasOne(e => e.DatumBereik)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<DatumBereik>(e => e.Id);
        }
    }


}