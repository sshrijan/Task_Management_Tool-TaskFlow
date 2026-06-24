using System.ComponentModel.DataAnnotations;
using TaskManagementToolWebApi.Models;

public class Project
{
    [Key]
    public int ProjectId { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public List<TaskItem> Tasks { get; set; } = new();
}