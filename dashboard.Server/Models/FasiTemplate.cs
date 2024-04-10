﻿
namespace dashboard.Server.Models;

public class FasiTemplate
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public int TipoLavorazioneId { get; set; }
    public string? Chilafa { get; set; }
    public DateTime? Quando { get; set; }
    public bool Eseguita { get; set; }
}
