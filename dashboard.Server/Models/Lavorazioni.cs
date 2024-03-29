using System.ComponentModel.DataAnnotations.Schema;

namespace dashboard.Server.Models
{
    public class Lavorazioni
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Nome { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Descrizione { get; set; }

        public int TempoDiLavorazione { get; set; }

        public int FornitoriId { get; set; }

        public Fornitori? Fornitori { get; set; }

        // Proprietà di navigazione per la collezione di materiali
        public ICollection<MaterialiPerLavorazione>? MaterialiPerLavorazione { get; set; }
    }


}
