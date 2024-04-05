using System.ComponentModel.DataAnnotations.Schema;

namespace dashboard.Server.Models
{
    public class Lavorazioni
    {
        public int Id { get; set; }

        public string? Fornitore { get; set; }
        public int FornitoreId { get; set; }

        public string? TipoLavorazione { get; set; }
        public int TipoLavorazioneId { get; set; }

        public string? Paziente { get; set; }
        public DateTime DataInserimento { get; set; }
        public DateTime Dataconsegna { get; set; }

        public bool Completata { get; set; }
    }


}
