using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class donatie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donaties_AspNetUsers_GastId",
                table: "Donaties");

            migrationBuilder.DropIndex(
                name: "IX_Donaties_GastId",
                table: "Donaties");

            migrationBuilder.DropColumn(
                name: "GastId",
                table: "Donaties");

            migrationBuilder.AlterColumn<double>(
                name: "Bedrag",
                table: "Donaties",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Donaties",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Naam",
                table: "Donaties",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Donaties");

            migrationBuilder.DropColumn(
                name: "Naam",
                table: "Donaties");

            migrationBuilder.AlterColumn<decimal>(
                name: "Bedrag",
                table: "Donaties",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AddColumn<string>(
                name: "GastId",
                table: "Donaties",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Donaties_GastId",
                table: "Donaties",
                column: "GastId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donaties_AspNetUsers_GastId",
                table: "Donaties",
                column: "GastId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
