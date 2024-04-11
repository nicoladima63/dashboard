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

    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly DataContext _context;

        public DataController(DataContext context)
        {
            _context = context;
        }

        [HttpDelete("{tableName}")]
        public IActionResult ClearTableData(string tableName)
        {
            if (string.IsNullOrEmpty(tableName))
            {
                return BadRequest("Table name cannot be empty");
            }

            try
            {
                _context.Database.ExecuteSql($"DELETE FROM {tableName}");
                _context.SaveChanges();
                return Ok("Data in table " + tableName + " cleared successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error clearing data: " + ex.Message);
            }
        }
    }
}