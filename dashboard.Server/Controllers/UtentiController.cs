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
    [Route("api/utenti")]
    [ApiController]
    public class UtentiController : ControllerBase
    {
        private readonly DataContext _context;

        public UtentiController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Utenti>>> GetAll()
        {
          if (_context.Utenti == null)
          {
              return NotFound();
          }
            return await _context.Utenti.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Utenti>> GetById(int id)
        {
          if (_context.Utenti == null)
          {
              return NotFound();
          }
            var user = await _context.Utenti.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Utenti user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Utenti>> Create(Utenti user)
        {
          if (_context.Utenti == null)
          {
              return Problem("Entity set 'DataContext.Users'  is null.");
          }
            _context.Utenti.Add(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Utenti == null)
            {
                return NotFound();
            }
            var user = await _context.Utenti.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Utenti.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Utenti?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
