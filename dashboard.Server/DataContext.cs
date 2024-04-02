using Microsoft.EntityFrameworkCore;
using dashboard.Server.Models;

namespace dashboard.Helper
{
    public class DataContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlite(connectionString);
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Utenti> Utenti {  get; set; }
        public DbSet<Lavorazioni> Lavorazioni { get; set; }
        public DbSet<Fornitori> Fornitori { get; set; }
        public DbSet<Fasi> Fasi { get; set; }
        public DbSet<FasiTemplate> FasiTemplate { get; set; } = default!;
        public DbSet<TipoLavorazione> TipoLavorazione { get; set; }
    }

}
