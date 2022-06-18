using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager) {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Denis",
                    Email = "denis@test.com",
                    UserName = "denis@test.com",
                    Address = new Address
                    {
                        FirstName = "Denis",
                        LastName = "Bogdanov",
                        Street = "Gestelsestraat",
                        City = "Eindhoven",
                        State = "Nord-Brabant",
                        ZipCode = "5654AM"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}