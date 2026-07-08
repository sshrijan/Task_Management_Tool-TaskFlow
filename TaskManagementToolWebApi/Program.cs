using Microsoft.EntityFrameworkCore;
using TaskManagementToolWebApi.Data;
using TaskManagementToolWebApi.Models;
using TaskManagementToolWebApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjectService, ProjectService>();



var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Users.Any())
    {
        db.Users.Add(new User
        {
            Name = "Admin",
            Email = "admin@gmail.com",
            PasswordHash = "admin123", // temporary for now
            Role = UserRole.Admin,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        });

        db.SaveChanges();
    }
}

app.Run();