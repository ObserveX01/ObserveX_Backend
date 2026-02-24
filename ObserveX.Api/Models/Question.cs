namespace ObserveX.Api.Models;

public class Question
{
    public int Id { get; set; }
    public string CourseName { get; set; } = string.Empty;
    public string TeacherEmail { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string Type { get; set; } = "MULTIPLE CHOICE";
    public int Points { get; set; } = 1;
    public int TimeLimit { get; set; } = 30;
    public List<QuestionOption> Options { get; set; } = new();
}