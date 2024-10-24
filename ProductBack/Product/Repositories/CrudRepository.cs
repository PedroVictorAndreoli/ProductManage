using Microsoft.EntityFrameworkCore;

namespace Product.Repositories
{
    public abstract class CrudRepository<T> where T : class
    {
        protected readonly ProductContext _context;

        public CrudRepository(ProductContext context) {
            _context = context;
        }

        public async Task Delete(T entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<T> Salvar(T entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _context.Add(entity);
            }
            else
            {
                _context.Update(entity);
            }
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> Update(T entity)
        {

            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> Selecionar(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> SelecionarTodos()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> ExecutarQuery(string query)
        {
            return await _context.Set<T>().FromSqlRaw(query).ToListAsync();
        }
    }
}
