
namespace dashboard.Server.Models;

public class FasiTemplate
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public int Lavorazione { get; set; }
    public int Chilafa { get; set; }
    public DateOnly? Quando { get; set; }
    public bool Eseguita { get; set; }
}
