using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dashboard.Server.Migrations
{
    /// <inheritdoc />
    public partial class NuovaStruttura : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lavorazioni_Fornitori_FornitoriId",
                table: "Lavorazioni");

            migrationBuilder.DropTable(
                name: "Compiti");

            migrationBuilder.DropTable(
                name: "MaterialiPerLavorazione");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Materiali");

            migrationBuilder.DropIndex(
                name: "IX_Lavorazioni_FornitoriId",
                table: "Lavorazioni");

            migrationBuilder.DropColumn(
                name: "FornitoriId",
                table: "Lavorazioni");

            migrationBuilder.DropColumn(
                name: "Compito",
                table: "Fasi");

            migrationBuilder.RenameColumn(
                name: "Tempodilavorazione",
                table: "Lavorazioni",
                newName: "Completata");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Lavorazioni",
                newName: "TipoLavorazione");

            migrationBuilder.RenameColumn(
                name: "Descrizione",
                table: "Lavorazioni",
                newName: "Paziente");

            migrationBuilder.RenameColumn(
                name: "Fatto",
                table: "FasiTemplate",
                newName: "Eseguita");

            migrationBuilder.RenameColumn(
                name: "Fatto",
                table: "Fasi",
                newName: "Eseguita");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DataInserimento",
                table: "Lavorazioni",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "Dataconsegna",
                table: "Lavorazioni",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "Fornitore",
                table: "Lavorazioni",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Fornitori",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Telefono",
                table: "Fornitori",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Fornitori",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Fornitori",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Colore",
                table: "Fornitori",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LAvorazione",
                table: "Fasi",
                type: "TEXT",
                nullable: true);

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TipoLavorazione");

            migrationBuilder.DropColumn(
                name: "DataInserimento",
                table: "Lavorazioni");

            migrationBuilder.DropColumn(
                name: "Dataconsegna",
                table: "Lavorazioni");

            migrationBuilder.DropColumn(
                name: "Fornitore",
                table: "Lavorazioni");

            migrationBuilder.DropColumn(
                name: "LAvorazione",
                table: "Fasi");

            migrationBuilder.RenameColumn(
                name: "TipoLavorazione",
                table: "Lavorazioni",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "Paziente",
                table: "Lavorazioni",
                newName: "Descrizione");

            migrationBuilder.RenameColumn(
                name: "Completata",
                table: "Lavorazioni",
                newName: "Tempodilavorazione");

            migrationBuilder.RenameColumn(
                name: "Eseguita",
                table: "FasiTemplate",
                newName: "Fatto");

            migrationBuilder.RenameColumn(
                name: "Eseguita",
                table: "Fasi",
                newName: "Fatto");

            migrationBuilder.AddColumn<int>(
                name: "FornitoriId",
                table: "Lavorazioni",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Fornitori",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Telefono",
                table: "Fornitori",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Fornitori",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Fornitori",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Colore",
                table: "Fornitori",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Compito",
                table: "Fasi",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Compiti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Aggiornatoda = table.Column<string>(type: "TEXT", nullable: true),
                    Aggiornatoil = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Completato = table.Column<bool>(type: "INTEGER", nullable: false),
                    InConsegna = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Inseritoda = table.Column<string>(type: "TEXT", nullable: true),
                    Inseritoil = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Lavorazione = table.Column<int>(type: "INTEGER", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Paziente = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compiti", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Materiali",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Prezzo = table.Column<double>(type: "REAL", nullable: false),
                    UnitaMisura = table.Column<string>(type: "TEXT", nullable: true)
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
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    Title = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
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

            migrationBuilder.AddForeignKey(
                name: "FK_Lavorazioni_Fornitori_FornitoriId",
                table: "Lavorazioni",
                column: "FornitoriId",
                principalTable: "Fornitori",
                principalColumn: "Id");
        }
    }
}
