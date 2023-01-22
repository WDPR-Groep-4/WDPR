// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Identity.UI.Services;
// using Microsoft.EntityFrameworkCore;
// using Moq;
// using Xunit;

// namespace Backend;

// public class AuthTest
// {
//     [Fact]
//     public async Task registreerTest()
//     {
//         // Arrange
//         var options = new DbContextOptionsBuilder<DatabaseContext>()
//             .UseInMemoryDatabase(databaseName: "RegistreerTest")
//             .Options;

//         using (var context = new DatabaseContext(options))
//         {
//             var userManagerMock = new Mock<UserManager<Gebruiker>>(Mock.Of<IUserStore<Gebruiker>>(), null, null, null, null, null, null, null, null);
//             var signInManager = new Mock<SignInManager<Gebruiker>>(userManagerMock.Object, null, null, null, null, null, null, null, null);
//             var emailSender = new Mock<IEmailSender>();
//             var logger = new Mock<ILogger<AuthController>>();

//             var AuthController = new AuthController(userManagerMock.Object, signInManager.Object, emailSender.Object, logger.Object, context);

//             // Act
//             var nieuweGebruiker = new GebruikerRegistreer
//             {
//                 Email = "test@mail.com",
//                 Achternaam = "test",
//                 Voornaam = "test",
//                 Password = "SterkWachtwoord1!",
//             };

//             var result = await AuthController.Registreer(nieuweGebruiker);

//             // Assert
//             var gebruiker = await context.Gebruikers.FirstOrDefaultAsync(g => g.Email == nieuweGebruiker.Email);

//             Assert.NotNull(gebruiker);
//         }
//     }
// }

