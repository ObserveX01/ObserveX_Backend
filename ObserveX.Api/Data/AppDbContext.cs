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
    public DbSet<ExamResult> ExamResults { get; set; }
    public DbSet<StudentAnswer> StudentAnswers { get; set; }

    // --- এই অংশটুকু যোগ করুন ---
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // টেবিলের নামগুলো ছোট হাতের অক্ষরে ম্যাপ করা হচ্ছে (Aiven/Linux এর জন্য)
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<UserProfile>().ToTable("userprofiles");
        modelBuilder.Entity<Question>().ToTable("questions");
        modelBuilder.Entity<QuestionOption>().ToTable("questionoptions");
        modelBuilder.Entity<ExamResult>().ToTable("examresults");
        modelBuilder.Entity<StudentAnswer>().ToTable("studentanswers");
    }
}