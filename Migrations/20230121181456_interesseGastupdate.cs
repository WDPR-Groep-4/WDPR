using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class interesseGastupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interesses_AspNetUsers_GastId",
                table: "Interesses");

            migrationBuilder.DropForeignKey(
                name: "FK_Interesses_Interesses_InteresseId",
                table: "Interesses");

            migrationBuilder.DropColumn(
                name: "GastId",
                table: "Interesses");

            migrationBuilder.DropColumn(
                name: "InteresseId",
                table: "Interesses");

            migrationBuilder.AddForeignKey(
                name: "FK_InteresseGasten_AspNetUsers_GastId",
                table: "InteresseGasten",
                column: "GastId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InteresseGasten_Interesses_InteresseId",
                table: "InteresseGasten",
                column: "InteresseId",
                principalTable: "Interesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InteresseGasten_AspNetUsers_GastId",
                table: "InteresseGasten");

            migrationBuilder.DropForeignKey(
                name: "FK_InteresseGasten_Interesses_InteresseId",
                table: "InteresseGasten");

            migrationBuilder.AddColumn<string>(
                name: "GastId",
                table: "Interesses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InteresseId",
                table: "Interesses",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Interesses_AspNetUsers_GastId",
                table: "Interesses",
                column: "GastId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Interesses_Interesses_InteresseId",
                table: "Interesses",
                column: "InteresseId",
                principalTable: "Interesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
