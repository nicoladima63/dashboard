namespace dashboard.Server.Models;

public class Fasi
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public int Compito  { get; set; }   
    public int Chilafa { get; set; }
    public DateTime? Quando { get; set; }
    public bool Fatto { get; set; }
}
