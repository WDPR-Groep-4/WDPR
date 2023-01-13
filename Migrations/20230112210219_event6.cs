using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class event6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RangRijStoel",
                table: "Tickets",
                newName: "RangStoel");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Betalingen",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateTable(
                name: "WinkelwagenItem",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VoorstellingEventId = table.Column<int>(type: "INTEGER", nullable: false),
                    Rang = table.Column<int>(type: "INTEGER", nullable: false),
                    Aantal = table.Column<int>(type: "INTEGER", nullable: false),
                    BetalingId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WinkelwagenItem", x => x.id);
                    table.ForeignKey(
                        name: "FK_WinkelwagenItem_Betalingen_BetalingId",
                        column: x => x.BetalingId,
                        principalTable: "Betalingen",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_WinkelwagenItem_BetalingId",
                table: "WinkelwagenItem",
                column: "BetalingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WinkelwagenItem");

            migrationBuilder.RenameColumn(
                name: "RangStoel",
                table: "Tickets",
                newName: "RangRijStoel");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Betalingen",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);
        }
    }
}
