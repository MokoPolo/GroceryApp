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
    public class IngredientController : ApiController
    {
        //HttpGet, Route("{reoccurringItems}")]
        public IHttpActionResult Get(bool reoccurringItems)
        {
            using (var context = new MarcDbEntities())
            {
                var data = (context.Ingredients
                    .Where(i => i.Reoccurring == reoccurringItems)
                                .Select(i => new SimpleIngredient
                                {
                                    Id = i.Id,
                                    Name = i.Name,
                                    Category = i.IngredientCategory.Category,
                                    Reoccurring = i.Reoccurring.HasValue ? i.Reoccurring.Value : false
                                })
                    ).ToList();
                return Ok(data);
            }
        }
        public IHttpActionResult Get(string filter)
        {
            using (var context = new MarcDbEntities())
            {
                var data = (context.Ingredients
                    .Where(i => i.Name.Contains(filter))
                    .Select(i => new SimpleIngredient
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Category = i.IngredientCategory.Category,
                        Reoccurring = i.Reoccurring.HasValue ? i.Reoccurring.Value : false
                    })
                    ).ToList();
                return Ok(data);
            }
        }
    }
}
