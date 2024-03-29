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
    [Route("api/lavorazioni")]
    [ApiController]
    public class LavorazioniController : ControllerBase
    {
        private readonly DataContext _context;

        public LavorazioniController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Lavorazioni
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lavorazioni>>> GetAll()
        {
          if (_context.Lavorazioni == null)
          {
              return NotFound();
          }
            return await _context.Lavorazioni.ToListAsync();
        }

        // GET: api/Lavorazioni/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lavorazioni>> GetById(int id)
        {
          if (_context.Lavorazioni == null)
          {
              return NotFound();
          }
            var lavorazioni = await _context.Lavorazioni.FindAsync(id);

            if (lavorazioni == null)
            {
                return NotFound();
            }

            return lavorazioni;
        }

        // PUT: api/Lavorazioni/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Lavorazioni lavorazioni)
        {
            if (id != lavorazioni.Id)
            {
                return BadRequest();
            }

            _context.Entry(lavorazioni).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LavorazioniExists(id))
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

        // POST: api/Lavorazioni
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Lavorazioni>> Create(Lavorazioni lavorazioni)
        {
          if (_context.Lavorazioni == null)
          {
              return Problem("Entity set 'DataContext.Lavorazioni'  is null.");
          }
            _context.Lavorazioni.Add(lavorazioni);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Lavorazioni/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Lavorazioni == null)
            {
                return NotFound();
            }
            var lavorazioni = await _context.Lavorazioni.FindAsync(id);
            if (lavorazioni == null)
            {
                return NotFound();
            }

            _context.Lavorazioni.Remove(lavorazioni);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LavorazioniExists(int id)
        {
            return (_context.Lavorazioni?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
