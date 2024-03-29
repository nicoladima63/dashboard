namespace dashboard.Server.Models
{

    public class Materiali
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? UnitaMisura { get; set; }
        public double Prezzo { get; set; } = 0;
        // Proprietà di navigazione per la collezione di lavorazioni
        public ICollection<MaterialiPerLavorazione>? MaterialiPerLavorazione { get; set; }
    }

}
