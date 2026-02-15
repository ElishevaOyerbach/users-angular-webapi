using System.Collections.Generic;
using System.Web.Http;
using Server_API.Models;

namespace Server_API.Controllers
{
    public class UsersController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var users = new List<User>
            {
                new User { Id = 1, Name = "Elisheva" },
                new User { Id = 2, Name = "Rut" },
                new User { Id = 3, Name = "Adi" },
                new User { Id = 4, Name = "Nomi" },
            };

            return Ok(users);
        }

        [HttpPost]
        public IHttpActionResult Post(User user)
        {
            if (user == null)
            {
                return BadRequest("User object is null");
            }

            if (user.Id <= 0)
            {
                return BadRequest("User Id must be greater than 0");
            }

            if (string.IsNullOrWhiteSpace(user.Name))
            {
                return BadRequest("User Name is required");
            }

            // Mock behavior – no DB
            return Ok(user);
        }
    }
}