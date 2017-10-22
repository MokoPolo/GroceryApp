using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GroceryAppService.Models;
using System.Web.Http.Cors;

namespace GroceryAppService.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class GroceryController : ApiController
    {
        // GET: api/Grocery
        public IHttpActionResult Get()
        {
            using (var context = new MarcDbEntities())
            {
                var data = (context.GroceryLists
                    .Select(g => new SimpleGrocery()
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Ingredients = g.GroceryIngredients
                                .Select(i => new SimpleIngredient
                                {
                                    Id = i.Ingredient.Id,
                                    Name = i.Ingredient.Name
                                })
                    })).FirstOrDefault();
                return Ok(data);
            }
        }

        // GET: api/Grocery/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

// Need to be able to add ingredient id

        // POST: api/Grocery
        public IHttpActionResult Post([FromBody]int recipeId)
        {
            using (var context = new MarcDbEntities())
            {
                var recipe = context.Recipes.FirstOrDefault(r => r.Id == recipeId);

                var ingredients = recipe.RecipeIngredients.Select(r => r.Ingredient);

                var groceryList = context.GroceryLists.FirstOrDefault();

                foreach (var ingredient in ingredients)
                {
                    if (!groceryList.GroceryIngredients.Any(i => i.Ingredient.Id == ingredient.Id))
                    {
                        groceryList.GroceryIngredients.Add(new GroceryIngredient() { Ingredient = ingredient });
                    }

                }

                context.SaveChanges();

                return Ok();
            }
        }

        // post is to create
        // put is to create or update

        // PUT: api/Grocery/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE: api/Grocery/5
        //public void Delete(int id)
        //{
        //}
    }
}
