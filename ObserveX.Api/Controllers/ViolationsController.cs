using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Data;
using ObserveX.Api.Models;

namespace ObserveX.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ViolationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ViolationsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("log")]
    public async Task<IActionResult> LogViolation([FromBody] ViolationLog log)
    {
        _context.ViolationLogs.Add(log);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Violation logged" });
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var data = await _context.ViolationLogs
            .OrderByDescending(v => v.Timestamp)
            .ToListAsync();

        return Ok(data);
    }

    [HttpGet("teacher/{email}")]
    public async Task<IActionResult> GetByTeacher(string email)
    {
        var data = await _context.ViolationLogs
            .Where(v => v.TeacherEmail == email)
            .OrderByDescending(v => v.Timestamp)
            .ToListAsync();

        return Ok(data);
    }

    [HttpGet("summary")]
public async Task<IActionResult> GetSummary()
{
    var data = await _context.ViolationLogs
        .GroupBy(v => new { v.StudentEmail, v.CourseName, v.TeacherEmail })
        .Select(g => new
        {
            g.Key.StudentEmail,
            g.Key.CourseName,
            g.Key.TeacherEmail, // 🔥 now directly from group
            Count = g.Count(),
            LastViolation = g.Max(x => x.Timestamp)
        })
        .OrderByDescending(x => x.Count)
        .ToListAsync();

    return Ok(data);
}
}


