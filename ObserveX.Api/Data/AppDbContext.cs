using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Models;

namespace ObserveX.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; } 
    
    public DbSet<UserProfile> UserProfiles { get; set; } 

    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionOption> QuestionOptions { get; set; }
}