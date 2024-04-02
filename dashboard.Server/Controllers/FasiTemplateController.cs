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
    [Route("api/fasitemplate")]
    [ApiController]
    public class FasiTemplateController : ControllerBase
    {
        private readonly DataContext _context;

        public FasiTemplateController(DataContext context)
        {
            _context = context;
        }

        // GET: api/FasiTemplate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FasiTemplate>>> GEtAll()
        {
          if (_context.FasiTemplate == null)
          {
              return NotFound();
          }
            return await _context.FasiTemplate.ToListAsync();
        }

        // GET: api/FasiTemplate/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FasiTemplate>> GetById(int id)
        {
          if (_context.FasiTemplate == null)
          {
              return NotFound();
          }
            var fasiTemplate = await _context.FasiTemplate.FindAsync(id);

            if (fasiTemplate == null)
            {
                return NotFound();
            }

            return fasiTemplate;
        }

        // PUT: api/FasiTemplate/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, FasiTemplate fasiTemplate)
        {
            if (id != fasiTemplate.Id)
            {
                return BadRequest();
            }

            _context.Entry(fasiTemplate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FasiTemplateExists(id))
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

        // POST: api/FasiTemplate
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FasiTemplate>> Create(FasiTemplate fasiTemplate)
        {
          if (_context.FasiTemplate == null)
          {
              return Problem("Entity set 'DataContext.FasiTemplate'  is null.");
          }
            _context.FasiTemplate.Add(fasiTemplate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFasiTemplate", new { id = fasiTemplate.Id }, fasiTemplate);
        }

        // DELETE: api/FasiTemplate/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.FasiTemplate == null)
            {
                return NotFound();
            }
            var fasiTemplate = await _context.FasiTemplate.FindAsync(id);
            if (fasiTemplate == null)
            {
                return NotFound();
            }

            _context.FasiTemplate.Remove(fasiTemplate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FasiTemplateExists(int id)
        {
            return (_context.FasiTemplate?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
