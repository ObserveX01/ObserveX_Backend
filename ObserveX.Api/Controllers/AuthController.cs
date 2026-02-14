using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Data;
using ObserveX.Api.Models;

namespace ObserveX.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase {
    private readonly AppDbContext _context;
    public AuthController(AppDbContext context) => _context = context;

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupDto data) {
        if (await _context.Users.AnyAsync(u => u.Email == data.Email))
            return BadRequest(new { message = "Email already exists" });

        var user = new User {
            Email = data.Email,
            PhoneNumber = data.PhoneNumber,
            Role = data.Role,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(data.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Success" });
    }
}

public record SignupDto(string Email, string PhoneNumber, string Password, string Role);