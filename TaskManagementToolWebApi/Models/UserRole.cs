using System.Text.Json.Serialization;

namespace TaskManagementToolWebApi.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]

    public enum UserRole
    {
        Admin,
        Member
    }
}
