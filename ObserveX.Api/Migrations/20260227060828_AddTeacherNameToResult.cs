using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable


Property<string>("TeacherEmail")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TeacherName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("TotalQuestions")
                        .HasColumnType("int");
namespace ObserveX.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddTeacherNameToResult : Migration
    {]g>(
                name: "TeacherName",
                table: "ExamResults",
                type: "longtext",
                nullable: false)
               
                    b.Property<string>("TeacherName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("TotalQuestions")
                        .HasColumnType("int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeacherName",
                table: "ExamResults");

                Property<string>("TeacherEmail")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TeacherName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("TotalQuestions")
                        .HasColumnType("int");
        }
    }
}
