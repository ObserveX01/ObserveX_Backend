using Microsoft.AspNetCore.Mvc;
using ObserveX.Api.Services;

namespace ObserveX.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProctorController : ControllerBase
{
    private readonly ProctoringService _proctor;
    public ProctorController(ProctoringService proctor) => _proctor = proctor;

    [HttpPost("analyze")]
    public IActionResult Analyze(IFormFile file)
    {
        if (file == null || file.Length == 0) return BadRequest("No image");

        using var stream = file.OpenReadStream();
        var result = _proctor.AnalyzeFrame(stream);

        // This matches the "data.violation" check in React
        return Ok(new { 
            violation = result.isViolation, 
            message = result.message 
        });
    }
}