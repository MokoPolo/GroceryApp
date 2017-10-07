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

        // POST: api/Recipe
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Recipe/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Recipe/5
        public void Delete(int id)
        {
        }
    }
}
