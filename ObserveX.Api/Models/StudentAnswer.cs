namespace ObserveX.Api.Models;

public class StudentAnswer
{
    public int Id { get; set; }
    public int ExamResultId { get; set; } // কোন পরীক্ষার অংশ এটি
    public int QuestionId { get; set; }
    public int SelectedOptionId { get; set; } // স্টুডেন্ট যেটা সিলেক্ট করেছে
    public bool IsCorrect { get; set; } // ওই উত্তরটি সঠিক ছিল কি না
}