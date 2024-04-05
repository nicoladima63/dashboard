using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dashboard.Server.Migrations
{
    /// <inheritdoc />
    public partial class ModificatabellaFasi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lavorazione",
                table: "Fasi",
                newName: "TipoLavorazione");

            migrationBuilder.AddColumn<int>(
                name: "TipoLavorazioneId",
                table: "Fasi",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoLavorazioneId",
                table: "Fasi");

            migrationBuilder.RenameColumn(
                name: "TipoLavorazione",
                table: "Fasi",
                newName: "Lavorazione");
        }
    }
}
