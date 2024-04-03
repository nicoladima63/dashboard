namespace dashboard.Server.Models;

public class Fasi
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? Lavorazione  { get; set; }   
    public int Chilafa { get; set; }
    public DateTime? Quando { get; set; }
    public bool Eseguita { get; set; }
}
