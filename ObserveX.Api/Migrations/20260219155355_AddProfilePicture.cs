using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ObserveX.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProfilePicture : Migration
    {
        /// <inheritdoc />
        /// 
        ///  b.Property<string>("Email")
                   

                    b.HasKey("Id");

                    b.ToTable("Users");

                         .IsRequired()
                        .HasColumnType("longtext");

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
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "UserProfiles");
        }
    }
}
