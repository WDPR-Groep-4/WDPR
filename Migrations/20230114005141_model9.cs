using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class model9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RangStoel",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "Rang",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Stoel",
                table: "Tickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rang",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Stoel",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "RangStoel",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
