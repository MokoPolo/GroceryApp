import React, {Component} from 'react';
import RecipeContainer from './RecipeContainer';
import GroceryContainer from './GroceryContainer';
import RecipeList from './RecipeList';

const tempRecipe = {
  "Name": "Awesome steak",
  "Ingredients": [
    "rib steak",
    "rosemary"
  ]
};
const tempGrocery = {
  "Ingredients": [
    "ingredient 1",
    "ingredient 2"
  ]
};

const tempRecipeList = 
  [
    "recipe 1",
    "recipe 2"
  ];

const HelloWorld = () => {
  return (
    <div>
      Hello World
    </div>
  );
};

// Stateless component
const App = (props) => {
  return (
    <div>
      <GroceryContainer groceryList={tempGrocery}  />
      <RecipeContainer recipe={tempRecipe}  />
      <RecipeList listofRecipes={tempRecipeList}  />
    </div>
  );   
};

export default App;
