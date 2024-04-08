namespace dashboard.Server.Models;

public class Fasi
{
    public int Id { get; set; }
    public int? LavorazioneId  { get; set; }
    public string? Nome { get; set; }

    public string? Chilafa { get; set; }
    public DateTime? Quando { get; set; }
    public bool Eseguita { get; set; }
}
