using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace dashboard.Server.Models
{
    public class User
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Title { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string? FirstName { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? LastName { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Email { get; set; }

        [JsonIgnore]
        [Column(TypeName = "nvarchar(max)")]
        public string? PasswordHash { get; set; }
    }
}