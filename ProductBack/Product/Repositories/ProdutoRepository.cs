using Product.Model;

namespace Product.Repositories
{
    public class ProdutoRepository : CrudRepository<Produto> 
    {
        public ProdutoRepository (ProductContext context) : base(context) { 

        }

    }
}
