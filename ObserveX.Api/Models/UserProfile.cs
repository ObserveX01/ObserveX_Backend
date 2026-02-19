namespace ObserveX.Api.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty; 
    public string? ProfilePicture { get; set; }
    public string PhoneNumber { get; set; } = string.Empty; 
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
}