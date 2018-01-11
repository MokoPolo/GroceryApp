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
    public class RecipeController : ApiController
    {
        // GET: api/Recipe
        /// <summary>
        /// Get all recipes
        /// </summary>
        /// <returns></returns>
        public IHttpActionResult Get()
        {
            using (var context = new MarcDbEntities())
            {
                //context.Configuration.ProxyCreationEnabled = false;
                if (context.Recipes.Any())
                {
                    var recipes = (context.Recipes
                        .Select(r => new SimpleRecipe
                        {
                            Name = r.Name,
                            Id = r.Id,
                            Ingredients = r.RecipeIngredients
                                .Select(i => new SimpleIngredient
                                {
                                    Id = i.Ingredient.Id,
                                    Name = i.Ingredient.Name
                                })
                        })).ToList();
                    return Ok(recipes);
                }
                else

                {
                    return NotFound();
                }
            }
        }

        // GET: api/Recipe/5
        /// <summary>
        /// Get recipe by id.
        /// </summary>
        /// <param name="recipeId"></param>
        /// <returns></returns>
        public IHttpActionResult Get(int id)
        {
            int recipeId = id;
            using (var context = new MarcDbEntities())
            {
                //context.Configuration.ProxyCreationEnabled = false;
                if (context.Recipes.Any(r => r.Id == recipeId))
                {
                    var recipe = (context.Recipes.Where(r => r.Id == recipeId)
                        .Select(r => new SimpleRecipe
                        {
                            Name = r.Name,
                            Id = r.Id,
                            Ingredients = r.RecipeIngredients
                                .Select(i => new SimpleIngredient
                                {
                                    Id = i.Ingredient.Id,
                                    Name = i.Ingredient.Name
                                })
                        })).FirstOrDefault();
                    return Ok(recipe);
                }
                else

                {
                    return NotFound();
                }
            }
        }

        // POST: api/Recipe I think this is the way to go
        /// <summary>
        /// Add ingredients to a recipe.
        /// </summary>
        /// <param name="recipe"></param>
        /// <returns></returns>
        public IHttpActionResult Post([FromBody]SimpleRecipe recipe)
        {
            using (var context = new MarcDbEntities())
            {
                if (!context.Recipes.Any(r => r.Id == recipe.Id))
                {
                    var temp = context.Recipes.Add(new Recipe() { Name = recipe.Name });
                    context.SaveChanges();
                    recipe.Id = temp.Id;
                }

                var recipeInDB = context.Recipes.FirstOrDefault(r => r.Id == recipe.Id);

                List<RecipeIngredient> listOfRecipeIngredients = new List<RecipeIngredient>();

                // Wipe out all ingredients for the recipe
                foreach (var recipeIngredient in recipeInDB.RecipeIngredients)
                {
                    listOfRecipeIngredients.Add(recipeIngredient);
                }

                foreach (var recipeIngredient in listOfRecipeIngredients)
                {
                    context.RecipeIngredients.Remove(recipeIngredient); 
                }

                context.SaveChanges();
                var category = context.IngredientCategories.FirstOrDefault(i => i.Id == 5);
                foreach (var ingredient in recipe.Ingredients)
                {
                    Ingredient ingredientInDB;

                    // If no id supplied, try to find by name or create a new entry in db
                    if (ingredient.Id == -1)
                    {
                        ingredientInDB = context.Ingredients.FirstOrDefault(r => r.Name.ToLower() == ingredient.Name.ToLower());

                        if (ingredientInDB == null)
                        {
                            ingredientInDB = context.Ingredients.Add(new Ingredient() { Name = ingredient.Name, IngredientCategory = category });
                        }
                    }
                    else
                    {
                        ingredientInDB = context.Ingredients.FirstOrDefault(r => r.Id == ingredient.Id);
                    }

                    if (ingredientInDB == null)
                    {
                        ingredientInDB = context.Ingredients.Add(new Ingredient() { Name = ingredientInDB.Name, IngredientCategory = category });
                    }

                    //if (!recipeInDB.RecipeIngredients.Any(i => i.IngredientId == ingredientInDB.Id))
                    //{
                        recipeInDB.RecipeIngredients.Add(new RecipeIngredient() { Ingredient = ingredientInDB });
                    //}
                }

                context.SaveChanges();

                return Ok();
            }
        }

        // PUT: api/Recipe/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE: api/Recipe/5
        /// <summary>
        /// Delete recipe by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IHttpActionResult Delete(int id)
        {
            using (var context = new MarcDbEntities())
            {
                if (!context.Recipes.Any(r => r.Id == id))
                {
                    return NotFound();
                }

                context.Recipes.Remove(context.Recipes.FirstOrDefault(r => r.Id == id));

                return Ok();
            }
        }
    }
}
