namespace dashboard.Server.Models;

public class Fasi
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? TipoLavorazione  { get; set; } 
    public int TipoLavorazioneId { get; set; }
    public string? Chilafa { get; set; }
    public int UtenteId { get; set; }   
    public DateTime? Quando { get; set; }
    public bool Eseguita { get; set; }
}
