using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dashboard.Server.Migrations
{
    /// <inheritdoc />
    public partial class Tutteletabelle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Compiti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Completato = table.Column<bool>(type: "INTEGER", nullable: false),
                    Inseritoil = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Aggiornatoil = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Inseritoda = table.Column<string>(type: "TEXT", nullable: true),
                    Aggiornatoda = table.Column<string>(type: "TEXT", nullable: true),
                    Paziente = table.Column<string>(type: "TEXT", nullable: true),
                    Lavorazione = table.Column<int>(type: "INTEGER", nullable: false),
                    InConsegna = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compiti", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fasi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Compito = table.Column<int>(type: "INTEGER", nullable: false),
                    Chilafa = table.Column<int>(type: "INTEGER", nullable: false),
                    Quando = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Fatto = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fasi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FasiTemplate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Lavorazione = table.Column<int>(type: "INTEGER", nullable: false),
                    Chilafa = table.Column<int>(type: "INTEGER", nullable: false),
                    Quando = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Fatto = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FasiTemplate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fornitori",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    Telefono = table.Column<string>(type: "TEXT", nullable: true),
                    Colore = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fornitori", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Materiali",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    UnitaMisura = table.Column<string>(type: "TEXT", nullable: true),
                    Prezzo = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materiali", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Utenti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utenti", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lavorazioni",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Descrizione = table.Column<string>(type: "TEXT", nullable: true),
                    Tempodilavorazione = table.Column<int>(type: "INTEGER", nullable: false),
                    FornitoriId = table.Column<int>(type: "INTEGER", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lavorazioni", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lavorazioni_Fornitori_FornitoriId",
                        column: x => x.FornitoriId,
                        principalTable: "Fornitori",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MaterialiPerLavorazione",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LavorazioneId = table.Column<int>(type: "INTEGER", nullable: false),
                    MaterialeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Quantita = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialiPerLavorazione", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaterialiPerLavorazione_Lavorazioni_LavorazioneId",
                        column: x => x.LavorazioneId,
                        principalTable: "Lavorazioni",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialiPerLavorazione_Materiali_MaterialeId",
                        column: x => x.MaterialeId,
                        principalTable: "Materiali",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lavorazioni_FornitoriId",
                table: "Lavorazioni",
                column: "FornitoriId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialiPerLavorazione_LavorazioneId",
                table: "MaterialiPerLavorazione",
                column: "LavorazioneId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialiPerLavorazione_MaterialeId",
                table: "MaterialiPerLavorazione",
                column: "MaterialeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Compiti");

            migrationBuilder.DropTable(
                name: "Fasi");

            migrationBuilder.DropTable(
                name: "FasiTemplate");

            migrationBuilder.DropTable(
                name: "MaterialiPerLavorazione");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Utenti");

            migrationBuilder.DropTable(
                name: "Lavorazioni");

            migrationBuilder.DropTable(
                name: "Materiali");

            migrationBuilder.DropTable(
                name: "Fornitori");
        }
    }
}
