using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroceryAppService.Models
{
    public class Recipe
    {
        public string Name { get; set; }
        public List<string> Ingredients { get; set; }

    }
}