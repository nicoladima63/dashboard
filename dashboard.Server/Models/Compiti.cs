using System.ComponentModel.DataAnnotations.Schema;

namespace dashboard.Server.Models;

public class Compiti
{
    public int Id { get; set; }

    [Column(TypeName = "nvarchar(max)")]
    public string? Nome { get; set; }

    [Column(TypeName = "bit")]
    public bool Completato { get; set; }

    [Column(TypeName = "DateTime")]
    public DateTime? Inseritoil { get; set; }

    [Column(TypeName = "DateTime")]
    public DateTime? Aggiornatoil { get; set; }

    [Column(TypeName = "nvarchar(max)")]
    public string? Inseritoda { get; set; }

    [Column(TypeName = "nvarchar(max)")]
    public string? Aggiornatoda { get; set; }

    [Column(TypeName = "nvarchar(max)")]
    public string? Paziente { get; set; }

    public int Lavorazione { get; set; }

    [Column(TypeName = "DateTime")]
    public DateTime? InConsegna { get; set; }

}
