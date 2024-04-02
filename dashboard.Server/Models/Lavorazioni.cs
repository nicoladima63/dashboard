using System.ComponentModel.DataAnnotations.Schema;

namespace dashboard.Server.Models
{
    public class Lavorazioni
    {
        public int Id { get; set; }

        public string? Fornitore { get; set; }

        public string? TipoLavorazione { get; set; }

        public string? Paziente { get; set; }
        public DateOnly DataInserimento { get; set; }
        public DateOnly Dataconsegna { get; set; }

        public bool Completata { get; set; }
    }


}
