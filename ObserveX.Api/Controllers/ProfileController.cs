using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Data;
using ObserveX.Api.Models;

namespace ObserveX.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProfileController(AppDbContext context) => _context = context;

        // ১. ডাটা ফেচ করার মেথড (রিফ্রেশ করলে এখান থেকেই ডাটা যায়)
        [HttpGet("{email}")]
        public async Task<IActionResult> GetProfile(string email)
        {
            var userAccount = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (userAccount == null) return NotFound(new { message = "User not found" });

            var profileDetails = await _context.UserProfiles.FirstOrDefaultAsync(p => p.Email == email);

            return Ok(new
            {
                email = userAccount.Email,
                phoneNumber = userAccount.PhoneNumber ?? profileDetails?.PhoneNumber ?? "", 
                firstName = profileDetails?.FirstName ?? "",
                lastName = profileDetails?.LastName ?? "",
                address = profileDetails?.Address ?? "",
                country = profileDetails?.Country ?? "",
                city = profileDetails?.City ?? "",
                zipCode = profileDetails?.ZipCode ?? "",
                profilePicture = profileDetails?.ProfilePicture ?? "" // এই নামেই React-এ যাবে
            });
        }

        // ২. প্রোফাইল টেক্সট আপডেট
        [HttpPost("update")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfile data)
        {
            var existing = await _context.UserProfiles.FirstOrDefaultAsync(p => p.Email == data.Email);
            if (existing == null) {
                _context.UserProfiles.Add(data);
            } else {
                existing.FirstName = data.FirstName;
                existing.LastName = data.LastName;
                existing.PhoneNumber = data.PhoneNumber; 
                existing.Address = data.Address;
                existing.Country = data.Country;
                existing.City = data.City;
                existing.ZipCode = data.ZipCode;
                _context.UserProfiles.Update(existing);
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Success" });
        }

        // ৩. ছবি আপলোড লজিক
        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string email)
        {
            if (file == null || file.Length == 0) return BadRequest("No file");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create)) {
                await file.CopyToAsync(stream);
            }

            var profile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.Email == email);
            if (profile != null) {
                profile.ProfilePicture = fileName;
                _context.UserProfiles.Update(profile);
            } else {
                _context.UserProfiles.Add(new UserProfile { Email = email, ProfilePicture = fileName });
            }

            await _context.SaveChangesAsync();
            return Ok(new { fileName });
        }
    }
}