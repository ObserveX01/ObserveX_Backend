namespace ObserveX.Api.Models;
public class ExamResult {
    public int Id { get; set; }
    public string StudentEmail { get; set; }= string.Empty;
      public string TeacherName { get; set; } = string.Empty; 
    public string TeacherEmail { get; set; }= string.Empty;
    public string CourseName { get; set; }= string.Empty;
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public double Percentage { get; set; }
    public DateTime ExamDate { get; set; } = DateTime.Now;
    public List<StudentAnswer> Answers { get; set; } = new List<StudentAnswer>();
}