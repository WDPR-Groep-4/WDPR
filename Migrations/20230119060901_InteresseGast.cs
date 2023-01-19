using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InteresseGast : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interesse_AspNetUsers_GastId",
                table: "Interesse");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Interesse",
                table: "Interesse");

            migrationBuilder.DropIndex(
                name: "IX_Interesse_GastId",
                table: "Interesse");

            migrationBuilder.DropColumn(
                name: "GastId",
                table: "Interesse");

            migrationBuilder.RenameTable(
                name: "Interesse",
                newName: "Interesses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Interesses",
                table: "Interesses",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "InteresseGasten",
                columns: table => new
                {
                    InteresseId = table.Column<int>(type: "INTEGER", nullable: false),
                    GastId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InteresseGasten", x => new { x.GastId, x.InteresseId });
                    table.ForeignKey(
                        name: "FK_InteresseGasten_AspNetUsers_GastId",
                        column: x => x.GastId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InteresseGasten_Interesses_InteresseId",
                        column: x => x.InteresseId,
                        principalTable: "Interesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InteresseGasten_InteresseId",
                table: "InteresseGasten",
                column: "InteresseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InteresseGasten");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Interesses",
                table: "Interesses");

            migrationBuilder.RenameTable(
                name: "Interesses",
                newName: "Interesse");

            migrationBuilder.AddColumn<string>(
                name: "GastId",
                table: "Interesse",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Interesse",
                table: "Interesse",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Interesse_GastId",
                table: "Interesse",
                column: "GastId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interesse_AspNetUsers_GastId",
                table: "Interesse",
                column: "GastId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
