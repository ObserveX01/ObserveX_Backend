using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Models;

namespace ObserveX.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; } 
    
    // THIS IS THE MISSING LINE:
    public DbSet<UserProfile> UserProfiles { get; set; } 
}