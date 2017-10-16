using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GroceryAppService.Models;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Recipe recipe = new Recipe();
            recipe.ConnectToDB();
        }
    }
}
