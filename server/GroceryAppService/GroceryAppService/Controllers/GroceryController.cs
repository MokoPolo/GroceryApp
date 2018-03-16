﻿using System;
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
                                    Done = i.Done.HasValue ? i.Done.Value : false,
                                    Category = i.Ingredient.IngredientCategory.Category,
                                    Quantity = i.Quantity.HasValue ? i.Quantity.Value : 1
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
            var groceryId = 1;
            using (var context = new MarcDbEntities())
            {
                var recipe = context.Recipes.FirstOrDefault(r => r.Id == recipeId);

                var ingredients = recipe.RecipeIngredients.Select(r => r.Ingredient);

                var groceryList = context.GroceryLists.FirstOrDefault();

                // Add recipe to db for tracking
                if (!context.GroceryRecipeLists.Any(gr => gr.GroceryId == groceryList.Id && gr.RecipeId == id))
                {
                    var groceryRecipe = new GroceryRecipeList()
                    {
                        GroceryId = groceryList.Id,
                        RecipeId = recipe.Id
                    };

                    context.GroceryRecipeLists.Add(groceryRecipe);
                }

                // Loop through all ingredients and if it doesn't exist add it
                foreach (var ingredient in ingredients)
                {
                    if (!groceryList.GroceryIngredients.Any(i => i.Ingredient.Id == ingredient.Id && i.GroceryId == groceryId))
                    {
                        groceryList.GroceryIngredients.Add(new GroceryIngredient() { Ingredient = ingredient });
                    }
                    else
                    {
                        // It's in the grocery list change the done status no matter what
                        var groceryIngredient = groceryList.GroceryIngredients.FirstOrDefault(i => i.Ingredient.Id == ingredient.Id && i.GroceryId == groceryId);
                        groceryIngredient.Done = false;
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

        [Route("api/grocery/{id}/recipes")]
        [HttpGet]
        public IHttpActionResult GetRelatedRecipes(int id)
        {
            using (var context = new MarcDbEntities())
            {
                var recipes = context.GroceryRecipeLists.Where(g => g.GroceryId == id);

                if (recipes.Any())
                {
                    var recipeList = recipes.Select(r => r.Recipe.Name).ToList();

                    return Ok(recipeList);
                }
                else
                {
                    return NotFound();
                }
            }
        }
        /// <summary>
        /// Change the quantity of a grocery ingredient.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [Route("api/grocery/{id}/{quantity}")]
        [HttpPut]
        public IHttpActionResult ModifyGroceryIngredientQuantity(int id, int quantity)
        {
            using (var context = new MarcDbEntities())
            {
                var groceryIngredients = context.GroceryIngredients.Where(g => g.GroceryId == 1);

                if (groceryIngredients.Any())
                {
                    var ingredient = groceryIngredients.FirstOrDefault(i => i.IngredientId == id);
                    ingredient.Quantity = quantity;

                    context.SaveChanges();

                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
        }
        [Route("api/grocery/ingredient/{id}")]
        [HttpGet]
        public IHttpActionResult GetGroceryIngredient(int id)
        {
            using (var context = new MarcDbEntities())
            {
                var data = (context.GroceryIngredients
                    .Where(i => i.GroceryId == 1 && i.IngredientId == id)
                    .Select(i => new SimpleIngredient
                    {
                        Id = i.IngredientId,
                        Name = i.Ingredient.Name,
                        Category = i.Ingredient.IngredientCategory == null ? "Other" : i.Ingredient.IngredientCategory.Category,
                        Reoccurring = i.Ingredient.Reoccurring.HasValue ? i.Ingredient.Reoccurring.Value : false,
                        Quantity = i.Quantity.HasValue ? i.Quantity.Value : 1,
                        CategoryId = i.Ingredient.IngredientCategory == null ? 0 : i.Ingredient.IngredientCategory.Id
                    })
                    ).FirstOrDefault();
                return Ok(data);
            }
        }
        [Route("api/grocery/ingredient/{id}/{categoryId}")]
        [HttpPut]
        public IHttpActionResult ModifyGroceryIngredientCategory(int id, int categoryId)
        {
            using (var context = new MarcDbEntities())
            {
                var groceryIngredients = context.GroceryIngredients.Where(g => g.GroceryId == 1);

                if (groceryIngredients.Any())
                {
                    var ingredient = groceryIngredients.FirstOrDefault(i => i.IngredientId == id).Ingredient;
                    var category = context.IngredientCategories.FirstOrDefault(i => i.Id == categoryId);

                    if (category != null)
                    {
                        ingredient.IngredientCategory = category;
                        context.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        return NotFound();
                    }
                    

                    
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
                        context.GroceryIngredients.Add(new GroceryIngredient() { Ingredient = ingredient, GroceryId = 1 });

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

                    // If this ingredient in the grocery list?
                    if (!groceryIngredients.Any())
                    {
                        // No it's not see if the ingredient actually exists
                        Ingredient ingredient = context.Ingredients.FirstOrDefault(i => i.Name == value.Name);
                        
                        if (ingredient == null)
                        {
                            // Created ingredient
                            ingredient = context.Ingredients.Add(new Ingredient { Name = value.Name });
                            context.SaveChanges();
                        }

                        context.GroceryIngredients.Add(new GroceryIngredient() { Ingredient = ingredient, GroceryId = 1 });

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
                    context.GroceryIngredients.RemoveRange(context.GroceryIngredients.Where(i => i.GroceryId == 1));
                    context.GroceryRecipeLists.RemoveRange(context.GroceryRecipeLists.Where(i => i.GroceryId == 1));
                    //db.People.RemoveRange(db.People.Where(x => x.State == "CA"));


                    //var ids = context.GroceryIngredients.Where(g => g.GroceryId == 1).Select(g => g.Id).ToList();

                    //foreach (var tempId in ids)
                    //{
                    //    context.GroceryIngredients.Remove(context.GroceryIngredients.FirstOrDefault(r => r.Id == tempId));
                    //}

                    context.SaveChanges();
                }

                return Ok();
            }

            return NotFound();
        }
    }
}
