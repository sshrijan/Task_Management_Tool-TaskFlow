using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TaskManagementToolWebApi.Models;

public class TaskItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public TaskItemStatus Status { get; set; } = TaskItemStatus.Todo;
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    [Required]
    public int AssignedToUserId { get; set; }

    [JsonIgnore]
    public User? User { get; set; }

    public int ProjectId { get; set; }

    [JsonIgnore]
    public Project? Project { get; set; }
}