using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GroceryAppService.Models;
using System.Linq;
using System.Collections.Generic;
using System.Configuration;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void sadf()
        {
            var asdf = ConfigurationManager.ConnectionStrings;
        }
        [TestMethod]
        public void GetRecipe()
        {
            using (var context = new MarcDbEntities())
            {
                var coo = context.Recipes.Count();
                var adfhgdsg = context.Recipes.FirstOrDefault(r => r.Id == 1);
            }
        }

        [TestMethod]
        public void InsertIngredient()
        {
            using (var context = new MarcDbEntities())
            {
                context.Ingredients.Add(new Ingredient() { Name = "Rosemary" });
                context.Ingredients.Add(new Ingredient() { Name = "Butter" });

                context.SaveChanges();
            }
        }

        [TestMethod]
        public void InsertRecipe()
        {
            using (var context = new MarcDbEntities())
            {
                var rosemary = context.Ingredients.FirstOrDefault(r => r.Name == "Rosemary");
                var butter = context.Ingredients.FirstOrDefault(r => r.Name == "Butter");

                var newRecipe = context.Recipes.Add(new Recipe() { Name = "Awesome steak" });

                context.RecipeIngredients.Add(new RecipeIngredient() { Recipe = newRecipe, Ingredient = rosemary });
                context.RecipeIngredients.Add(new RecipeIngredient() { Recipe = newRecipe, Ingredient = butter });

                context.SaveChanges();
            }
        }

        [TestMethod]
        public void InsertGroceryList()
        {
            using (var context = new MarcDbEntities())
            {
                var list = context.GroceryLists.Add(new GroceryList() { Name = "Main" });

                context.SaveChanges();
            }
        }

        [TestMethod]
        public void InsertRecipeToGroceryList()
        {
            using (var context = new MarcDbEntities())
            {
                var recipe = context.Recipes.FirstOrDefault(r => r.Id == 1);

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
            }
        }
    }
}
