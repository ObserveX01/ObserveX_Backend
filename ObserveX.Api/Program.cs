using Microsoft.EntityFrameworkCore;
using ObserveX.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Get Connection String
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 2. Configure MySQL for XAMPP
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// 3. Enable CORS for your React App
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173") // Your Vite React Port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowReact");
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();
app.Run();