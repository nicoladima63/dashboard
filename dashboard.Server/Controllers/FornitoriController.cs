using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dashboard.Server.Models;
using dashboard.Helper;

namespace WebApiSQLite.Controllers
{
    [Route("api/fornitori")]
    [ApiController]
    public class FornitoriController : ControllerBase
    {
        private readonly DataContext _context;

        public FornitoriController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Fornitori
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornitori>>> GetAll()
        {
          if (_context.Fornitori == null)
          {
              return NotFound();
          }
            return await _context.Fornitori.ToListAsync();
        }

        // GET: api/Fornitori/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fornitori>> GetById(int id)
        {
          if (_context.Fornitori == null)
          {
              return NotFound();
          }
            var fornitori = await _context.Fornitori.FindAsync(id);

            if (fornitori == null)
            {
                return NotFound();
            }

            return fornitori;
        }

        // PUT: api/Fornitori/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Fornitori fornitori)
        {
            if (id != fornitori.Id)
            {
                return BadRequest();
            }

            _context.Entry(fornitori).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FornitoriExists(id))
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

        // POST: api/Fornitori
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Fornitori>> Create(Fornitori fornitori)
        {
          if (_context.Fornitori == null)
          {
              return Problem("Entity set 'DataContext.Fornitori'  is null.");
          }
            _context.Fornitori.Add(fornitori);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Fornitori/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Fornitori == null)
            {
                return NotFound();
            }
            var fornitori = await _context.Fornitori.FindAsync(id);
            if (fornitori == null)
            {
                return NotFound();
            }

            _context.Fornitori.Remove(fornitori);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FornitoriExists(int id)
        {
            return (_context.Fornitori?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
