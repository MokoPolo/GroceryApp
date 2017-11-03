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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
                                    Name = i.Ingredient.Name,
                                    Done = i.Done.HasValue ? i.Done.Value : false
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

        /// <summary>
        /// Take a recipe id and add all ingredients to grocery list
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IHttpActionResult Post(int id)
        {
            var recipeId = id;
            using (var context = new MarcDbEntities())
            {
                var recipe = context.Recipes.FirstOrDefault(r => r.Id == recipeId);

                var ingredients = recipe.RecipeIngredients.Select(r => r.Ingredient);

                var groceryList = context.GroceryLists.FirstOrDefault();

                // Loop through all ingredients and if it doesn't exist add it
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

        /// <summary>
        /// Mark ingredient as done or not.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        public IHttpActionResult Put(int id, [FromBody]bool value)
        {
            var recipeId = id;
            using (var context = new MarcDbEntities())
            {
                var groceryIngredients = context.GroceryIngredients.Where(g => g.GroceryId == 1);

                if (groceryIngredients.Any())
                {
                    var ingredient = groceryIngredients.FirstOrDefault(i => i.IngredientId == id);
                    ingredient.Done = value;

                    context.SaveChanges();

                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
        }

        /// <summary>
        /// Take an ingredient and add it to grocery list
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public IHttpActionResult Post([FromBody]SimpleIngredient value)
        {
            // Add by ID
            // Add by name if no ID present
            using (var context = new MarcDbEntities())
            {
                // Let's try by id first then name
                if (value.Id != -1)
                {
                    var groceryIngredients = context.GroceryIngredients.Where(g => g.IngredientId == value.Id);

                    if (!groceryIngredients.Any())
                    {
                        var ingredient = context.Ingredients.FirstOrDefault(i => i.Id == value.Id);
                        context.GroceryIngredients.Add(new GroceryIngredient() { Ingredient = ingredient });

                        context.SaveChanges();

                        return Ok();
                    }
                    else
                    {
                        // Already exists
                        return Ok();
                    }
                }
                else
                {
                    var groceryIngredients = context.GroceryIngredients.Where(g => g.Ingredient.Name == value.Name);

                    if (!groceryIngredients.Any())
                    {
                        Ingredient ingredient = context.Ingredients.FirstOrDefault(i => i.Name == value.Name);
                        
                        if (ingredient != null)
                        {
                            context.GroceryIngredients.Add(new GroceryIngredient() { Ingredient = ingredient });
                        }
                        else
                        {
                            // Created ingredient
                            ingredient = context.Ingredients.Add(new Ingredient { Name = value.Name });
                        }

                        context.SaveChanges();

                        return Ok();
                    }
                    else
                    {
                        // Already exists
                        return Ok();
                    }
                }
                


            }
        }
        // DELETE: api/Grocery/5
        public IHttpActionResult Delete(int id)
        {
            if (id == 9999)
            {
                using (var context = new MarcDbEntities())
                {
                    var ids = context.GroceryIngredients.Where(g => g.GroceryId == 1).Select(g => g.Id).ToList();

                    foreach (var tempId in ids)
                    {
                        context.GroceryIngredients.Remove(context.GroceryIngredients.FirstOrDefault(r => r.Id == tempId));
                    }

                    context.SaveChanges();
                }

                return Ok();
            }

            return NotFound();
        }
    }
}
