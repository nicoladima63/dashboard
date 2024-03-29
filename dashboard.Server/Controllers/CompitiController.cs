using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dashboard.Helper;
using dashboard.Server.Models;

namespace WebApiSQLite.Controllers
{
    [Route("api/compiti")]
    [ApiController]
    public class CompitiController : ControllerBase
    {
        private readonly DataContext _context;

        public CompitiController(DataContext context)
        {
            _context = context;
        }

        // GET: api/compiti
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Compiti>>> GetAll()
        {
          if (_context.Compiti == null)
          {
              return NotFound();
          }
            return await _context.Compiti.ToListAsync();
        }

        // GET: api/compiti/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Compiti>> GetById(int id)
        {
          if (_context.Compiti == null)
          {
              return NotFound();
          }
            var compito = await _context.Compiti.FindAsync(id);

            if (compito == null)
            {
                return NotFound();
            }

            return compito;
        }

        // PUT: api/compiti/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Compiti compito)
        {
            if (id != compito.Id)
            {
                return BadRequest();
            }

            _context.Entry(compito).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompitoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Compiti
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Compiti>> Create(Compiti compito)
        {
          if (_context.Compiti == null)
          {
              return Problem("Entity set 'TodoContext.TodoItems'  is null.");
          }
            _context.Compiti.Add(compito);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Compiti == null)
            {
                return NotFound();
            }
            var todoItem = await _context.Compiti.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Compiti.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompitoExists(int id)
        {
            return (_context.Compiti?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
