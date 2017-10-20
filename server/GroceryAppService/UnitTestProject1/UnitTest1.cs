using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GroceryAppService.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using System.Collections.Generic;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        class Person
        {
            public string Name { get; set; }

            public int Age { get; set; }

            public IEnumerable<Pet> Pets { get; set; }

            public int[] FavoriteNumbers { get; set; }

            public HashSet<string> FavoriteNames { get; set; }

            public DateTime CreatedAtUtc { get; set; }
        }

        class Pet
        {
            public string Name { get; set; }
        }
        public class Entity
        {
            public ObjectId Id { get; set; }

            public string Name { get; set; }
        }

        [TestMethod]
        public void TestMethod1()
        {
            Recipe recipe = new Recipe();
            recipe.ConnectToDB();
        }

        [TestMethod]
        public void InsertToDB()
        {
            var collection = db.GetCollection<Person>("people");
            var queryable = collection.AsQueryable();

            var query = from p in collection.AsQueryable()
                        where p.Age > 21
                        select new { p.Name, p.Age };
        }
    }
}
