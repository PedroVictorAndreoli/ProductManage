using Microsoft.AspNetCore.Mvc;
using Product.Model;
using Product.Repositories;

namespace Product.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : CrudController<Produto>
    {
        private readonly ProdutoRepository _produtoRepository;
        public ProdutoController(ProdutoRepository crudRepository) : base(crudRepository)
        {
            _produtoRepository = crudRepository;
        }
    }
}
