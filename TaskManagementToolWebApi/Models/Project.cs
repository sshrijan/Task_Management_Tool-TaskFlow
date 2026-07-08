using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TaskManagementToolWebApi.Models;

public class Project
{
    [Key]
    public int ProjectId { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [JsonIgnore]
    public List<TaskItem> Tasks { get; set; } = new();
}