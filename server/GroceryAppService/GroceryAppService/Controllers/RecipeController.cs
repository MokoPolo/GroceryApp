using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GroceryAppService.Models;

namespace GroceryAppService.Controllers
{
    public class RecipeController : ApiController
    {
        // GET: api/Recipe
        public IEnumerable<Recipe> Get()
        {
            return null;
        }

        // GET: api/Recipe/5
        public Recipe Get(int id)
        {
            Recipe asdf = new Recipe();

            return new Recipe() {
                Name = "Steak",
                Ingredients = new List<string> { "Rib steak", "Rosemary", "Butter" }
            };
        }

        // POST: api/Recipe I think this is the way to go
        public IHttpActionResult Post([FromBody]Recipe value)
        {
            // Here we have a recipe
            return Ok();
        }

        // PUT: api/Recipe/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE: api/Recipe/5
        public IHttpActionResult Delete(int id)
        {
            return NotFound();
        }
    }
}
