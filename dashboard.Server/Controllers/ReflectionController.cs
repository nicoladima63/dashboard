using dashboard.Helper;
using dashboard.Server.Models;
using dashboard.Server.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dashboard.Server.Controllers
{
    [Route("api/reflection")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        private readonly DataContext _context;

        public ReflectionController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("lavorazioni")]
        public async Task<IActionResult> GetLavorazioni()
        {
            try
            {
                var lavorazioni = await _context.Lavorazioni.ToListAsync();
                var propertyNames = ModelReflection.GetPropertyNames(typeof(Lavorazioni));
                return Ok(new { lavorazioni, propertyNames });
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
        [HttpGet("fornitori")]
        public async Task<IActionResult> GetFornitori()
        {
            try
            {
                var fornitori = await _context.Fornitori.ToListAsync();
                var propertyNames = ModelReflection.GetPropertyNames(typeof(Fornitori));
                return Ok(new { fornitori, propertyNames });
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("compiti")]
        public async Task<IActionResult> GetCompiti()
        {
            try
            {
                var compiti = await _context.Compiti.ToListAsync();
                var propertyNames = ModelReflection.GetPropertyNames(typeof(Compiti));
                return Ok(new { compiti, propertyNames });
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        private IActionResult HandleError(Exception ex)
        {
            // Loggare l'errore
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);

            // Restituire un codice di errore HTTP appropriato
            if (ex is DbUpdateException)
            {
                return StatusCode(500, "Errore durante l'accesso al database.");
            }
            else
            {
                return StatusCode(500, "Errore generico.");
            }
        }

    }

}
