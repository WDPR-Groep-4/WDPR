using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class event4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DatumBereik_Voorstellingen_VoorstellingId",
                table: "DatumBereik");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_DatumBereik_DatumBereikId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_DatumBereikId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_DatumBereik_VoorstellingId",
                table: "DatumBereik");

            migrationBuilder.DropColumn(
                name: "DatumBereikId",
                table: "Events");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "DatumBereik",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddForeignKey(
                name: "FK_DatumBereik_Events_Id",
                table: "DatumBereik",
                column: "Id",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DatumBereik_Events_Id",
                table: "DatumBereik");

            migrationBuilder.AddColumn<int>(
                name: "DatumBereikId",
                table: "Events",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "DatumBereik",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_DatumBereikId",
                table: "Events",
                column: "DatumBereikId");

            migrationBuilder.CreateIndex(
                name: "IX_DatumBereik_VoorstellingId",
                table: "DatumBereik",
                column: "VoorstellingId");

            migrationBuilder.AddForeignKey(
                name: "FK_DatumBereik_Voorstellingen_VoorstellingId",
                table: "DatumBereik",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_DatumBereik_DatumBereikId",
                table: "Events",
                column: "DatumBereikId",
                principalTable: "DatumBereik",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
