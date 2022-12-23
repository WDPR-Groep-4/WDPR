using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace PretparkApi.Controllers;

[ApiController]
[Route("[controller]")]
public class RollenController : ControllerBase
{
    private readonly UserManager<Gebruiker> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public RollenController(UserManager<Gebruiker> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpGet]
    [Route("start")]
    public void Start()
    {
        if (!_roleManager.RoleExistsAsync("Administrator").Result == true)
        {
            CreateRolesAndAdminUser(_roleManager, _userManager);
        }
    }

    private void CreateRolesAndAdminUser(RoleManager<IdentityRole> roleManager, UserManager<Gebruiker> userManager)
    {
        const string adminRoleName = "Administrator";
        string[] roleNames = { adminRoleName, "Medewerker", "Gebruiker", "Begunstiger" };

        foreach (string roleName in roleNames)
        {
            CreateRole(roleManager, roleName);
        }

        string adminUserName = "admin";
        string adminPwd = "SterkWachtwoord!1";

        Gebruiker adminUser = new Gebruiker
        {
            UserName = adminUserName,
            Email = "admin@mail.com",
            Voornaam = "Admin",
            Achternaam = "Admin",
        };

        Task<IdentityResult> taskCreateAdminUser = userManager.CreateAsync(adminUser, adminPwd);

        if (taskCreateAdminUser.Result.Succeeded)
        {
            AddUserToRole(userManager, adminUser, adminRoleName);
        }
    }

    private void CreateRole(RoleManager<IdentityRole> roleManager, string roleName)
    {
        Task<bool> roleExists = roleManager.RoleExistsAsync(roleName);
        roleExists.Wait();

        if (!roleExists.Result)
        {
            Task<IdentityResult> roleResult = roleManager.CreateAsync(new IdentityRole(roleName));
            roleResult.Wait();
        }
    }

    private void AddUserToRole(UserManager<Gebruiker> userManager, Gebruiker gebruiker, string roleName)
    {
        Task<IdentityResult> newUserRole = userManager.AddToRoleAsync(gebruiker, roleName);
        newUserRole.Wait();
    }

    [HttpPost]
    [Route("usertorole")]
    [Authorize(Roles = "Administrator")]
    public async Task<IdentityResult> AddUserToRole(GebruikerMetRol g)
    {
        Task<Gebruiker> checkAppUser = _userManager.FindByNameAsync(g.userName);
        checkAppUser.Wait();

        Gebruiker appUser = checkAppUser.Result;

        if (checkAppUser.Result == null)
        {
            return IdentityResult.Failed();
        }

        return await _userManager.AddToRoleAsync(appUser, g.roleName);
    }
}

public class GebruikerMetRol
{
    public string userName { get; init; }
    public string roleName { get; init; }
}
