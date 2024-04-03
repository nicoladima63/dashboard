using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dashboard.Server.Models
{
    public class Fornitori
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Il campo Nome è obbligatorio.")]
        public string? Nome { get; set; }

        [EmailAddress(ErrorMessage = "Il campo Email non è un indirizzo email valido.")]
        public string? Email { get; set; }

        public string? Url { get; set; }

        public string? Telefono { get; set; }

        public string? Colore { get; set; }

    }
}
