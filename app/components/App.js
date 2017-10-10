import React, {Component} from 'react';
import RecipeContainer from './RecipeContainer';
import GroceryContainer from './GroceryContainer';

const tempRecipe = {
  "Name": "sample string 1",
  "Ingredients": [
    "ingredient 1",
    "ingredient 2"
  ]
};
const tempGrocery = {
  "Ingredients": [
    "ingredient 1",
    "ingredient 2"
  ]
};

const HelloWorld = () => {
  return (
    <div>
      Hello World
    </div>
  );
};

// Stateless component
const App = (props) => {
debugger;
  return (
    <div>
      
      <GroceryContainer groceryList={tempGrocery}  />
    </div>
  );   
};


// <RecipeContainer recipe={tempRecipe}  />
export default App;
