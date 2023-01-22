using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Backend;

public class DonatieTest
{
    // [Fact]
    // public async Task GetTotaal()
    // {
    //     // Arrange
    //     var options = new DbContextOptionsBuilder<DatabaseContext>()
    //         .UseInMemoryDatabase(databaseName: "AddTokenTest")
    //         .Options;

    //     using (var context = new DatabaseContext(options))
    //     {
    //         var userManager = new UserManager<Gebruiker>(new UserStore<Gebruiker>(context), null, null, null, null, null, null, null, null);
    //         var logger = new Mock<ILogger<DonatieController>>().Object;

    //         var gebruiker = new Gebruiker { UserName = "test@mail.com", Email = "test@mail.com", Achternaam = "test", Voornaam = "test" };

    //         //add donatie to gebruiker
    //         context.Gebruikers.Add(gebruiker);

    //         context.SaveChanges();

    //         var DonatieController = new DonatieController(context, logger, userManager);

    //         // Act

    //         context.Donaties.Add(new Donatie
    //         {
    //             Email = gebruiker.Email,
    //             Bedrag = 1000,
    //             Naam = "test",
    //             Datum = DateTime.Now
    //         });

    //         context.SaveChanges();

    //         var result = await DonatieController.GetTotaalDonaties(gebruiker.Email);

    //         // Assert
    //         Assert.Equal(1000, result);
    //     }
    // }
}