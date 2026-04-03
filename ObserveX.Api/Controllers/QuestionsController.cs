using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Data;
using ObserveX.Api.Models;

[Route("api/[controller]")]
[ApiController]
public class QuestionsController : ControllerBase
{
    private readonly AppDbContext _context;
    public QuestionsController(AppDbContext context) => _context = context;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Question question)
    {
        _context.Questions.Add(question);
        await _context.SaveChangesAsync();
        return Ok(question);
    }

    [HttpGet("{email}")]
    public async Task<IActionResult> GetTeacherQuestions(string email)
    {
        var questions = await _context.Questions
            .Include(q => q.Options)
            .Where(q => q.TeacherEmail == email)
            .ToListAsync();

        var result = from q in questions
                 join p in _context.UserProfiles on q.TeacherEmail equals p.Email into details
                 from p in details.DefaultIfEmpty()
                 select new {
                     q.Id,
                     q.CourseName,
                     q.Text,
                     q.Type,
                     q.TeacherEmail,
                     // Combine names, fallback to "ObserveX Teacher" if profile doesn't exist
                     TeacherName = p != null ? $"{p.FirstName} {p.LastName}" : "ObserveX Teacher",
                     Options = q.Options
                 };
        return Ok(result);
    }

    // POST: api/questions/bulk
    [HttpPost("bulk")]
    public async Task<IActionResult> CreateBulk([FromBody] List<Question> questions)
    {
        if (questions == null || questions.Count == 0)
        {
            return BadRequest("No questions provided.");
        }

        try
        {
            _context.Questions.AddRange(questions);
            await _context.SaveChangesAsync();
            return Ok(new { message = "All questions saved successfully!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // PUT: api/questions/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuestion(int id, [FromBody] Question updatedQuestion)
    {
        if (id != updatedQuestion.Id) return BadRequest();

        var existingQuestion = await _context.Questions
            .Include(q => q.Options)
            .FirstOrDefaultAsync(q => q.Id == id);

        if (existingQuestion == null) return NotFound();

        
        existingQuestion.Text = updatedQuestion.Text;

    
        _context.QuestionOptions.RemoveRange(existingQuestion.Options);
        existingQuestion.Options = updatedQuestion.Options;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!QuestionExists(id)) return NotFound();
            else throw;
        }

        return Ok(new { message = "Question updated successfully!" });
    }

    private bool QuestionExists(int id) => _context.Questions.Any(e => e.Id == id);

    // GET: api/questions/all
    [HttpGet("all")]
    public async Task<IActionResult> GetAllCourses()
    {
        var questions = await _context.Questions
            .Include(q => q.Options)
            .ToListAsync();

        var result = from q in questions
                    join p in _context.UserProfiles on q.TeacherEmail equals p.Email into details
                    from p in details.DefaultIfEmpty()
                    select new {
                        q.Id,
                        q.CourseName,
                        q.Text,
                        q.TeacherEmail,
                        TeacherName = p != null ? $"{p.FirstName} {p.LastName}" : "ObserveX Teacher",
                        Options = q.Options
                    };

        return Ok(result);
    }



  [HttpDelete("{id}")]
public async Task<IActionResult> DeleteQuestion(int id)
{
    var question = await _context.Questions
        .Include(q => q.Options)
        .FirstOrDefaultAsync(q => q.Id == id);

    if (question == null) return NotFound();

    // ১. এই প্রশ্নের সাথে জড়িত কোর্স এবং টিচারের নাম জেনে নেওয়া
    string courseName = question.CourseName;
    string teacherEmail = question.TeacherEmail;

    // ২. ওই কোর্সের সকল স্টুডেন্ট উত্তর (StudentAnswers) মুছে ফেলা
    var relatedAnswers = _context.StudentAnswers.Where(sa => sa.QuestionId == id);
    _context.StudentAnswers.RemoveRange(relatedAnswers);

    // ৩. ঐচ্ছিক কিন্তু জরুরি: যেহেতু পরীক্ষাটি পরিবর্তিত হচ্ছে, ওই কোর্সের পুরনো সামারি রেজাল্ট মুছে ফেলা
    // যাতে এডমিন ড্যাশবোর্ডে পুরনো এভারেজ না দেখায়
    var relatedResults = _context.ExamResults.Where(r => r.CourseName == courseName && r.TeacherEmail == teacherEmail);
    _context.ExamResults.RemoveRange(relatedResults);

    // ৪. মূল প্রশ্ন ডিলিট করা
    _context.Questions.Remove(question);

    await _context.SaveChangesAsync();
    
    return Ok(new { message = "Question and all historical results for this course cleared." });
}

}