using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dashboard.Server.Models;
using dashboard.Helper;

namespace dashboard.Server.Controllers
{
    [Route("api/tipiLavorazione")]
    [ApiController]

    public class TipiLavorazioneController : ControllerBase
    {
        private readonly DataContext _context;

        public TipiLavorazioneController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoLavorazione>>> GetAll()
        {
            if (_context.TipoLavorazione == null)
            {
                return NotFound();
            }
            return await _context.TipoLavorazione.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoLavorazione>> GetById(int id)
        {
            if (_context.TipoLavorazione == null)
            {
                return NotFound();
            }
            var user = await _context.TipoLavorazione.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TipoLavorazione tipoLavorazione)
        {
            if (id != tipoLavorazione.Id)
            {
                return BadRequest();
            }

            _context.Entry(tipoLavorazione).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoLavorazione(id))
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

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<TipoLavorazione>> Create(TipoLavorazione tipoLavorazione)
        {
            if (_context.TipoLavorazione == null)
            {
                return Problem("Entity set 'DataContext.TipoLavorazione'  is null.");
            }
            _context.TipoLavorazione.Add(tipoLavorazione);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.TipoLavorazione == null)
            {
                return NotFound();
            }
            var tipoLavorazione = await _context.TipoLavorazione.FindAsync(id);
            if (tipoLavorazione == null)
            {
                return NotFound();
            }

            _context.TipoLavorazione.Remove(tipoLavorazione);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool TipoLavorazione(int id)
        {
            return (_context.Utenti?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
