using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class event5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_GastId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_DatumBereik_DatumBereikId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Voorstellingen_VoorstellingId",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tickets",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_DatumBereikId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_GastId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DatumBereikId",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "VoorstellingId",
                table: "Tickets",
                newName: "VoorstellingEventId");

            migrationBuilder.RenameColumn(
                name: "GastId",
                table: "Tickets",
                newName: "Email");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_VoorstellingId",
                table: "Tickets",
                newName: "IX_Tickets_VoorstellingEventId");

            migrationBuilder.AddColumn<Guid>(
                name: "TicketId",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Zaal",
                table: "Events",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tickets",
                table: "Tickets",
                column: "TicketId");

            migrationBuilder.CreateTable(
                name: "Betalingen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Succes = table.Column<bool>(type: "INTEGER", nullable: true),
                    Pending = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Betalingen", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Events_VoorstellingEventId",
                table: "Tickets",
                column: "VoorstellingEventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Events_VoorstellingEventId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "Betalingen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tickets",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Zaal",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "VoorstellingEventId",
                table: "Tickets",
                newName: "VoorstellingId");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Tickets",
                newName: "GastId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_VoorstellingEventId",
                table: "Tickets",
                newName: "IX_Tickets_VoorstellingId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "DatumBereikId",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tickets",
                table: "Tickets",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_DatumBereikId",
                table: "Tickets",
                column: "DatumBereikId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_GastId",
                table: "Tickets",
                column: "GastId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_GastId",
                table: "Tickets",
                column: "GastId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_DatumBereik_DatumBereikId",
                table: "Tickets",
                column: "DatumBereikId",
                principalTable: "DatumBereik",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Voorstellingen_VoorstellingId",
                table: "Tickets",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "VoorstellingId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
