using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class fix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DatumBereik_Voorstellingen_VoorstellingId",
                table: "DatumBereik");

            migrationBuilder.DropForeignKey(
                name: "FK_RangPrijs_Voorstellingen_VoorstellingId",
                table: "RangPrijs");

            migrationBuilder.AlterColumn<int>(
                name: "VoorstellingId",
                table: "RangPrijs",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "VoorstellingId",
                table: "DatumBereik",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DatumBereik_Voorstellingen_VoorstellingId",
                table: "DatumBereik",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RangPrijs_Voorstellingen_VoorstellingId",
                table: "RangPrijs",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DatumBereik_Voorstellingen_VoorstellingId",
                table: "DatumBereik");

            migrationBuilder.DropForeignKey(
                name: "FK_RangPrijs_Voorstellingen_VoorstellingId",
                table: "RangPrijs");

            migrationBuilder.AlterColumn<int>(
                name: "VoorstellingId",
                table: "RangPrijs",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "VoorstellingId",
                table: "DatumBereik",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_DatumBereik_Voorstellingen_VoorstellingId",
                table: "DatumBereik",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId");

            migrationBuilder.AddForeignKey(
                name: "FK_RangPrijs_Voorstellingen_VoorstellingId",
                table: "RangPrijs",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId");
        }
    }
}
