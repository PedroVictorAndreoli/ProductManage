using Microsoft.AspNetCore.Mvc;
using Product.Repositories;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace Product.Controllers
{
    [ApiController]
    public abstract class CrudController<T> : Controller where T : class
    {
            protected readonly CrudRepository<T> _crudRepository;

            public CrudController(CrudRepository<T> crudRepository)
            {
                _crudRepository = crudRepository;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<T>>> GetAll()
            {
                return Ok(await _crudRepository.SelecionarTodos());
            }

            [HttpDelete("{id}")]
            public async Task<ActionResult<T>> DeleteObject(int id)
            {
                T entity = await _crudRepository.Selecionar(id);
                _crudRepository.Delete(entity);
                return Ok(entity);
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<T>> Get(int id)
            {
                return Ok(await _crudRepository.Selecionar(id));
            }

            [HttpPut]
            public async Task<ActionResult<T>> Update([FromBody] T entity)
            {
                return Ok(await _crudRepository.Update(entity));
            }

            [HttpPost]
            public async Task<ActionResult<T>> Salvar([FromBody] T entity)
            {
                return Ok(await _crudRepository.Salvar(entity));
            }
        }
    }

