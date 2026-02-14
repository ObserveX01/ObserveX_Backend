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
        return Ok(new { message = "Registration successful" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto data) {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == data.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(data.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password." });

        if (user.Role != data.Role)
            return Unauthorized(new { message = "Incorrect role selected for this account." });

        return Ok(new { message = "Login success", email = user.Email, role = user.Role });
    }
}

public record SignupDto(string Email, string PhoneNumber, string Password, string Role);
public record LoginDto(string Email, string Password, string Role);