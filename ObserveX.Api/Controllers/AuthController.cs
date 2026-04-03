using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ObserveX.Api.Data;
using ObserveX.Api.Models;

namespace ObserveX.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupDto data)
    {
        // 1. Check if email already exists
        if (await _context.Users.AnyAsync(u => u.Email == data.Email))
            return BadRequest(new { message = "Email already exists." });

        // 2. Create new user and hash the password
        var user = new User
        {
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
    public async Task<IActionResult> Login([FromBody] LoginDto data)
    {
        // 1. Find user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == data.Email);

        // 2. Verify user exists and password is correct
        if (user == null || !BCrypt.Net.BCrypt.Verify(data.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // 3. Verify the role matches (Prevent Student from logging in as Admin, etc.)
        if (user.Role != data.Role)
        {
            return Unauthorized(new { message = "Incorrect role selected for this account." });
        }

        // 4. Generate JWT Token
        var token = GenerateJwtToken(user);

        // 5. Return success with Token and User info
        return Ok(new
        {
            message = "Login success",
            token = token,
            email = user.Email,
            role = user.Role
        });
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        
        // Get Key from appsettings.json
        var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]!);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserEmail", user.Email) // Custom claim
            }),
            Expires = DateTime.UtcNow.AddHours(2), // Token valid for 2 hours
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), 
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

// DTOs (Data Transfer Objects)
public record SignupDto(string Email, string PhoneNumber, string Password, string Role);
public record LoginDto(string Email, string Password, string Role);