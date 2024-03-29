using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using dashboard.Server.Models;
using dashboard.Helper;

namespace WebApiSQLite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableFieldsController : ControllerBase
    {
        private readonly DataContext _context;

        public TableFieldsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/TableFields/{tableName}
        [HttpGet("{tableName}")]
        public IActionResult Get(string tableName)
        {
            try
            {
                List<string> columnNames = new List<string>();

                using (var connection = _context.Database.GetDbConnection() as SqliteConnection)
                {
                    connection.Open();

                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = $"PRAGMA table_info({tableName})";

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                columnNames.Add(reader["name"].ToString());
                            }
                        }
                    }
                }

                return Ok(columnNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
