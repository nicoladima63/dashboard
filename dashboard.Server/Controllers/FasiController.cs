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
    [Route("api/fasi")]
    [ApiController]
    public class FasiController : ControllerBase
    {
        private readonly DataContext _context;

        public FasiController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Fasi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fasi>>> GetAll()
        {
          if (_context.Fasi == null)
          {
              return NotFound();
          }
            return await _context.Fasi.ToListAsync();
        }

        // GET: api/Fasi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fasi>> GetById(int id)
        {
          if (_context.Fasi == null)
          {
              return NotFound();
          }
            var fasi = await _context.Fasi.FindAsync(id);

            if (fasi == null)
            {
                return NotFound();
            }

            return fasi;
        }

        // PUT: api/Fasi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Fasi fasi)
        {
            if (id != fasi.Id)
            {
                return BadRequest();
            }

            _context.Entry(fasi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FasiExists(id))
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

        // POST: api/Fasi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Fasi>> Create(Fasi fase)
        {
          if (_context.Fasi == null)
          {
              return Problem("Entity set 'DataContext.Fasi'  is null.");
          }
            _context.Fasi.Add(fase);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = fase.Id }, fase);
        }

        // DELETE: api/Fasi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Fasi == null)
            {
                return NotFound();
            }
            var fasi = await _context.Fasi.FindAsync(id);
            if (fasi == null)
            {
                return NotFound();
            }

            _context.Fasi.Remove(fasi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FasiExists(int id)
        {
            return (_context.Fasi?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
