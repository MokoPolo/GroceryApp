import React, {Component} from 'react';
import RecipeContainer from './RecipeContainer';

let tempRecipe = {
  "Name": "sample string 1",
  "Ingredients": [
    "sample string 1",
    "sample string 2"
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
  return (
    <RecipeContainer recipe="tempRecipe"  />
  );   
};



export default App;
