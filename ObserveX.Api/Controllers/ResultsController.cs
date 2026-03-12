using Microsoft.AspNetCore.Mvc;
using ObserveX.Api.Data;
using ObserveX.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ObserveX.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ResultsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ResultsController(AppDbContext context)
    {
        _context = context;
    }

    // ১. এক্সাম রেজাল্ট এবং স্টুডেন্টের সব উত্তর সেভ করা
    [HttpPost("save")]
    public async Task<IActionResult> SaveResult([FromBody] ExamResult result)
    {
        try
        {
            // Entity Framework অটোমেটিক রেজাল্টের সাথে Answers লিস্টটিও সেভ করবে
            _context.ExamResults.Add(result);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Result and answers saved successfully" });
        }
         catch (Exception ex)
    {
        // এরর মেসেজ টার্মিনালে প্রিন্ট হবে
        Console.WriteLine($"DB Error: {ex.Message}");
        if (ex.InnerException != null) Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
        
        return BadRequest(new { message = "Error saving result", details = ex.Message });
    }
    }

    // ২. স্টুডেন্টের সব অ্যাক্টিভিটি দেখা (Join ছাড়া, সরাসরি রেজাল্ট টেবিল থেকে)
    [HttpGet("student/{email}")]
    public async Task<IActionResult> GetResultsByStudent(string email)
    {
        var results = await _context.ExamResults
            .Where(r => r.StudentEmail == email)
            .OrderByDescending(r => r.ExamDate)
            .Select(r => new {
                r.Id,
                r.CourseName,
                r.Score,
                r.TotalQuestions,
                r.Percentage,
                r.ExamDate,
                r.TeacherEmail,
                r.TeacherName // সরাসরি এখান থেকেই নাম আসবে
            })
            .ToListAsync();

        return Ok(results);
    }

    // ৩. সর্বশেষ রেজাল্ট চেক করা (Improve Exam বাটনের জন্য এটি প্রয়োজন)
    [HttpGet("latest/{studentEmail}/{courseName}")]
public async Task<IActionResult> GetLatestResult(string studentEmail, string courseName)
{
    var result = await _context.ExamResults
        .Where(r => r.StudentEmail == studentEmail && r.CourseName == courseName)
        .OrderByDescending(r => r.ExamDate)
        .FirstOrDefaultAsync();

    // NotFound() এর বদলে Ok(null) দিন
    if (result == null) 
    {
        return Ok(null); 
    }
    
    return Ok(result);
}

    // ৪. রিভিউ পেজের জন্য বিস্তারিত ডাটা (সঠিক/ভুল উত্তরসহ)
    [HttpGet("details/{resultId}")]
    public async Task<IActionResult> GetReviewDetails(int resultId)
    {
        var result = await _context.ExamResults.FindAsync(resultId);
        if (result == null) return NotFound();

        var details = await (from sa in _context.StudentAnswers
                             join q in _context.Questions on sa.QuestionId equals q.Id
                             where sa.ExamResultId == resultId
                             select new {
                                 QuestionText = q.Text,
                                 // স্টুডেন্টের দেওয়া উত্তরটির টেক্সট আনছি
                                 UserOptionText = _context.QuestionOptions
                                     .Where(o => o.Id == sa.SelectedOptionId)
                                     .Select(o => o.Text).FirstOrDefault(),
                                 // সঠিক উত্তরটির টেক্সট আনছি
                                 CorrectOptionText = _context.QuestionOptions
                                     .Where(o => o.QuestionId == q.Id && o.IsCorrect)
                                     .Select(o => o.Text).FirstOrDefault(),
                                 sa.IsCorrect
                             }).ToListAsync();

        return Ok(new {
            result.CourseName,
            result.Score,
            result.TotalQuestions,
            result.Percentage,
            Details = details
        });
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllResults()
    {
        // Left Join: প্রোফাইল না থাকলেও রেজাল্ট আসবে
        var results = await (from r in _context.ExamResults
                            join p in _context.UserProfiles on r.StudentEmail equals p.Email into profileGroup
                            from p in profileGroup.DefaultIfEmpty()
                            select new {
                                r.Id,
                                r.StudentEmail,
                                // যদি p নাল হয় (প্রোফাইল নেই), তবে "NULL" স্ট্রিং বসবে
                                StudentName = p != null ? (p.FirstName + " " + p.LastName).Trim() : "NULL",
                                r.TeacherEmail,
                                r.TeacherName,
                                r.CourseName,
                                r.Score,
                                r.TotalQuestions,
                                r.Percentage,
                                r.ExamDate
                            })
                            .OrderByDescending(x => x.ExamDate)
                            .ToListAsync();

        return Ok(results);
    }

    [HttpGet("teacher/{teacherEmail}")]
public async Task<IActionResult> GetResultsByTeacher(string teacherEmail)
{
    var results = await _context.ExamResults
        .Where(r => r.TeacherEmail == teacherEmail)
        .OrderByDescending(r => r.ExamDate)
        .ToListAsync();
    return Ok(results);
}
}