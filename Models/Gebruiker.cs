using Microsoft.AspNetCore.Identity;

public class Gebruiker : IdentityUser
{
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }
    public string Rol { get; set; }
}