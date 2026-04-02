using System.ComponentModel.DataAnnotations.Schema;


namespace ObserveX.Api.Models;

[Table("violationlogs")]
public class ViolationLog
{
    public int Id { get; set; }

    
    public string Message { get; set; } = string.Empty;

    public DateTime Timestamp { get; set; } = DateTime.Now;

     public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
}


public int Id { get; set; }

    public string StudentEmail { get; set; } = string.Empty;

    public string TeacherEmail { get; set; } = string.Empty;

    public string CourseName { get; set; } = string.Empty;
}