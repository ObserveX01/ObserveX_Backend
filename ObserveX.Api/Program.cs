using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ObserveX.Api.Data;
using Microsoft.EntityFrameworkCore;
// 1. Add this namespace (Assuming your service is in this folder)
using ObserveX.Api.Services; 

var builder = WebApplication.CreateBuilder(args);

// --- 1. Database Connection ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// --- 2. JWT Authentication Configuration ---
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

// --- 3. Register AI Proctoring Service (New Addition) ---
// We use AddSingleton so the model stays in memory and doesn't reload on every request.
builder.Services.AddSingleton<ProctoringService>();


// --- 4. CORS ---
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.AllowAnyOrigin() // আপাতত সব অরিজিন এলাউ করুন অথবা আপনার Azure URL দিন
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// --- 5. Middleware Pipeline ---
app.UseCors("AllowReact");
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();