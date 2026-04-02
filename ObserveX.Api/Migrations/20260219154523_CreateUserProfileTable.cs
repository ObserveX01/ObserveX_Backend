using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ObserveX.Api.Migrations
{
    /// <inheritdoc />
    public partial class CreateUserProfileTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                 b.Property<string>("Email")
                   

                    b.HasKey("Id");

                    b.ToTable("Users");

                         .IsRequired()
                        .HasColumnType("longtext");
                         .A
                
                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<str

                    b;
                });
#pragma warning restore 612, 618
        }
                name: "UserProfiles",
                columns: table => new
                {
                    Violations
                        .A
                
                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");
                });
#pragma warning restore 612, 618
        }
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProfiles");
                 b.Property<string>("Email")
                   

                    b.HasKey("Id");

                    b.ToTableeNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");
                });
#pragma warning restore 612, 618
        }
        }
    }
}
