using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dashboard.Server.Models
{
    public class Fornitori
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Il campo Nome è obbligatorio.")]
        [Column(TypeName = "nvarchar(max)")]
        public string? Nome { get; set; }

        [EmailAddress(ErrorMessage = "Il campo Email non è un indirizzo email valido.")]
        [Column(TypeName = "nvarchar(max)")]
        public string? Email { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Url { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Telefono { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Colore { get; set; }

        //public ICollection<Lavorazioni>? LavorazioniFornite { get; set; }
    }
}
