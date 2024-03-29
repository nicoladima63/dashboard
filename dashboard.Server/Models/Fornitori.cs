using System.ComponentModel.DataAnnotations.Schema;

namespace dashboard.Server.Models
{
    public class Fornitori
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Nome { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Email { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Url { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Telefono { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Colore { get; set; }

        public ICollection<Lavorazioni>? LavorazioniFornite { get; set; }
    }
}
