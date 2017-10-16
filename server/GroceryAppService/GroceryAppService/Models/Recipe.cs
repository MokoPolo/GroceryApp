using MongoDB.Bson;
using MongoDB.Driver;
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

        public void ConnectToDB()
        {
            var client = new MongoClient();

            IMongoDatabase db = client.GetDatabase("MarcDB");

            IMongoCollection<BsonDocument> collection = db.GetCollection<BsonDocument>("Recipes");
        }

    }
}