namespace Backend;

using Microsoft.EntityFrameworkCore;
using Xunit;

public class PlanningUtilsTest
{
    //checken of datum vrij is terwijl er al een event is op die datum
    [Fact]
    public void IsDatumVrijTest()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: "IsDatumVrijTest")
            .Options;
        using (var context = new DatabaseContext(options))
        {
            var zaal = new Zaal { ZaalNummer = 1, Rangen = new List<int> { 1, 2, 3 } };
            var datumBereik = new DatumBereik { Van = new DateTime(2021, 1, 1), Tot = new DateTime(2021, 1, 2) };
            var planningEvent = new VoorstellingEvent { DatumBereik = datumBereik, Zaal = zaal.ZaalNummer };
            context.Events.Add(planningEvent);
            context.SaveChanges();
        }
        using (var context = new DatabaseContext(options))
        {
            var datumBereik = new DatumBereik { Van = new DateTime(2021, 1, 1), Tot = new DateTime(2021, 1, 2) };
            // Act
            var result = PlanningUtils.IsDatumVrij(datumBereik, 1, context);
            // Assert
            Assert.False(result);
        }

    }

    //checken of datum vrij is terwijl er geen event is op die datum
    [Fact]
    public void IsDatumVrijTest2()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: "IsDatumVrijTest2")
            .Options;
        using (var context = new DatabaseContext(options))
        {
            var zaal = new Zaal { ZaalNummer = 1, Rangen = new List<int> { 1, 2, 3 } };
            var datumBereik = new DatumBereik { Van = new DateTime(2021, 1, 1), Tot = new DateTime(2021, 1, 2) };
            var planningEvent = new VoorstellingEvent { DatumBereik = datumBereik, Zaal = zaal.ZaalNummer };
            context.Events.Add(planningEvent);
            context.SaveChanges();
        }
        using (var context = new DatabaseContext(options))
        {
            var datumBereik = new DatumBereik { Van = new DateTime(2021, 1, 3), Tot = new DateTime(2021, 1, 4) };
            // Act
            var result = PlanningUtils.IsDatumVrij(datumBereik, 1, context);
            // Assert
            Assert.True(result);
        }

    }

    //checken of datum vrij is terwijl er een event is op die datum maar in een andere zaal
    [Fact]
    public void IsDatumVrijTest3()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: "IsDatumVrijTest3")
            .Options;
        using (var context = new DatabaseContext(options))
        {
            var zaal = new Zaal { ZaalNummer = 1, Rangen = new List<int> { 1, 2, 3 } };
            var datumBereik = new DatumBereik { Van = new DateTime(2021, 1, 1), Tot = new DateTime(2021, 1, 2) };
            var planningEvent = new VoorstellingEvent { DatumBereik = datumBereik, Zaal = zaal.ZaalNummer };
            context.Events.Add(planningEvent);
            context.SaveChanges();
        }
        using (var context = new DatabaseContext(options))
        {
            var datumBereik = new DatumBereik { Van = new DateTime(2021, 1, 1), Tot = new DateTime(2021, 1, 2) };
            // Act
            var result = PlanningUtils.IsDatumVrij(datumBereik, 2, context);
            // Assert
            Assert.True(result);
        }

    }
}

