using System.ComponentModel.DataAnnotations.Schema;
namespace ObserveX.Api.Models;
[Table("users")] 
public class User {
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}