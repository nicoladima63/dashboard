using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dashboard.Server.Migrations
{
    /// <inheritdoc />
    public partial class Inizio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fasi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Lavorazione = table.Column<string>(type: "TEXT", nullable: true),
                    Chilafa = table.Column<string>(type: "TEXT", nullable: true),
                    Quando = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Eseguita = table.Column<bool>(type: "INTEGER", nullable: false)
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
                    Lavorazione = table.Column<string>(type: "TEXT", nullable: true),
                    Chilafa = table.Column<string>(type: "TEXT", nullable: true),
                    Quando = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Eseguita = table.Column<bool>(type: "INTEGER", nullable: false)
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
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
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
                name: "Lavorazioni",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Fornitore = table.Column<string>(type: "TEXT", nullable: true),
                    TipoLavorazione = table.Column<string>(type: "TEXT", nullable: true),
                    Paziente = table.Column<string>(type: "TEXT", nullable: true),
                    DataInserimento = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Dataconsegna = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Completata = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lavorazioni", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TipoLavorazione",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Fornitore = table.Column<string>(type: "TEXT", nullable: true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Descrizione = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoLavorazione", x => x.Id);
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fasi");

            migrationBuilder.DropTable(
                name: "FasiTemplate");

            migrationBuilder.DropTable(
                name: "Fornitori");

            migrationBuilder.DropTable(
                name: "Lavorazioni");

            migrationBuilder.DropTable(
                name: "TipoLavorazione");

            migrationBuilder.DropTable(
                name: "Utenti");
        }
    }
}
