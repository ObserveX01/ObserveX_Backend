using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;


ng Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ObserveX.Api.Data;

using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ObserveX.Api.Data;

ng Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ObserveX.Api.Data;

using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ObserveX.Api.Data;


    /// <inheritdoc />
    public partial class AddViolationLogs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionOptions_Questions_QuestionId",
                table: "QuestionOptions");

#nullable disable

namespace ObserveX.Api.Migrations
{
    /// <inheritdoc />
    public
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAnswers_ExamResults_ExamResultId",
                table: "StudentAnswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentAnswers",
                tabl]
                table: "ExamResults");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "UserProfiles",
                newName: "userprofiles");

            migrationBuilder.RenameTable(
                  name: "FK_questionoptions_questions_QuestionId",
                table: "questionoptions",
                column: "QuestionId",
                principalTable: "questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_studentanswers_examresults_ExamResultId",
                table: "studentanswers",
                column: "ExamResultId",
                principalTable: "examresults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
                n]]

            migrationBuilder.RenameIndex(
                name: "IX_StudentAnswers_ExamResultId",
                table: "studentanswers",
                newName: "IX_studentanswers_ExamResultId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionOptions_QuestionId",
                table: "questionoptions",
                n

            migrationBuilder.AddPrimaryKey(
                name: "PK_questionoptions",
                table: "questionoptions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_examresults",
                table: "examresults",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "violationlogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                      
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_violationlogs", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_questionoptions_questions_QuestionId",
                table: "questionoptions",
                column: "QuestionId",
                principalTable: "questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_studentanswers_examresults_ExamResultId",
                table: "studentanswers",
                column: "ExamResultId",
                principalTable: "examresults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_questionoptions_questions_QuestionId",
                table: "questionoptions");

            migrationBuilder.DropForeignKey(
                name: "FK_studentanswers_examresults_ExamResultId",
                table: "studentanswers");

            migrationBuilder.DropTable(
                name: "violationlogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userprofiles",
                table: "userprofiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_studentanswers",
                table: "studentanswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_questions",
                table: "questions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_questionoptions",
                table: "questionoptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_examresults",
                table: "examresults");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "userprofiles",
                newName: "UserProfiles");

            migrationBuilder.RenameTable(
                name: "studentanswers",
                newName: "StudentAnswers");

            migrationBuilder.RenameTable(
                name: "questions",
                newName: "Questions");

            migrationBuilder.RenameTable(
                name: "questionoptions",
                newName: "QuestionOptions");

            migrationBuilder.RenameTable(
                name: "examresults",
                newName: "ExamResults");

            migrationBuilder.RenameIndex(
                name: "IX_studentanswers_ExamResultId",
                table: "StudentAnswers",
                newName: "IX_StudentAnswers_ExamResultId");

            migrationBuilder.RenameIndex(
                name: "IX_questionoptions_QuestionId",
                table: "QuestionOptions",
                newName: "IX_QuestionOptions_QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentAnswers",
                table: "StudentAnswers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Questions",
                table: "Questions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionOptions",
                table: "QuestionOptions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamResults",
                table: "ExamResults",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionOptions_Questions_QuestionId",
                table: "QuestionOptions",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAnswers_ExamResults_ExamResultId",
                table: "StudentAnswers",
                column: "ExamResultId",
                principalTable: "ExamResults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
