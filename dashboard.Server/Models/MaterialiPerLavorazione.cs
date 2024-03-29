namespace dashboard.Server.Models
{
    public class MaterialiPerLavorazione
    {
        public int Id { get; set; }

        // Chiave esterna per la lavorazione
        public int LavorazioneId { get; set; }
        public Lavorazioni? Lavorazione { get; set; }

        // Chiave esterna per il materiale
        public int MaterialeId { get; set; }
        public Materiali? Materiale { get; set; }

        public decimal Quantita { get; set; }
    }
}