using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryAppService.Models
{
    public class SimpleRecipe
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<SimpleIngredient> Ingredients { get; set; }
    }

    public class SimpleIngredient
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool Done { get; set; }

        public string Category { get; set; }
    }
}