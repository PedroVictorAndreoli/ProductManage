using Microsoft.EntityFrameworkCore;
using Product.Model;

namespace Product
{
    public class ProductContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public ProductContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Produto> Produto { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>(entity =>
            {
                entity.HasKey(e => e.id).HasName("idproduto");
            });

            modelBuilder.HasSequence("seqproduto");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("User ID=postgres;Password=postgre;Host=127.0.0.1;Port=5432;Database=produto;Connection Lifetime=0");
        }

    }
}
