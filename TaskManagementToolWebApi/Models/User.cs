using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TaskManagementToolWebApi.Models;

public class User
{
    [Key]
    public int UserId { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    public UserRole Role { get; set; } = UserRole.Member;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;

    [JsonIgnore]
    public List<TaskItem> Tasks { get; set; } = new();

}