using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Models;

namespace ObserveX.Api.Data;

 public DbSet<User> Users { get; set; } 
    public DbSet<UserProfile> UserProfiles { get; set; } 
    public DbSet<Question> Questions { get; set; }

public class AppDbContext : DbContext
{
    

     // টেবিলের নামগুলো ছোট হাতের অক্ষরে ম্যাপ করা হচ্ছে (Aiven/Linux এর জন্য)
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<UserProfile>().ToTable("userprofiles");
        modelBuilder.Enti
        ublic int Id { get; set; }
    public string StudentEmail { get; set; }= string.Empty;
      public string TeacherName { get; set; } = string.Empty; 
    public string TeacherEmail { get; set; }= string.Empty;
    public string CourseName { get; set; }= string.Empty;
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public double Percentage { get; set; }
    public DateTime ExamDate { get; set; } = DateTime.Now;
    public List<StudentAnswer> Answers { get; set; } = new List<StudentAnswer>();

    // --- এই অংশটুকু যোগ করুন ---
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

ty<Question>().ToTable("questions");
        modelBuilder.Entity<QuestionOption>().ToTable("questionoptions");
        modelBuilder.Entity<ExamResult>().ToTable("examresults");
        modelBuilder.Entity<StudentAnswer>().ToTable("studentanswers");
        modelBuilder.Entity<ViolationLog>().ToTable("violationlogs");


    public DbSet<User> Users { get; set; } 
    public DbSet<UserProfile> UserProfiles { get; set; } 
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionOption> QuestionOptions { get; set; }
    public DbSet<ExamResult> ExamResults { get; set; }
    public DbSet<StudentAnswer> StudentAnswers { get; set; }
    public DbSet<ViolationLog> ViolationLogs { get; set; }
       

         modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<UserProfile>().ToTable("userprofiles");
        modelBuilder.Entity<Question>().ToTable("questions");
        modelBuilder.Entity<QuestionOption>().ToTable("questionoptions");
        modelBuilder.Entity<ExamResult>().ToTable("examresults");
    }
}