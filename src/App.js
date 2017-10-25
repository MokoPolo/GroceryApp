import React, { Component } from 'react';
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
/*const tempGrocery = {
  "Ingredients": [
    "ingredient 1",
    "ingredient 2"
  ]
};*/

/*const tempRecipeList = 
  [
    "recipe 1",
    "recipe 2"
  ];*/

/*const HelloWorld = () => {
  return (
    <div>
      Hello World
    </div>
  );
};*/

// Stateless component
class App extends Component {
  componentDidMount() {
    fetch("http://localhost:64755/Api/grocery")
      .then(result => {
        return result.json();
      })
      .then(data =>
        this.setState({ Ingredients: data.Ingredients })
      );
  }

  recipeListClickHandler = (id) => {
    console.log("in handler " + id);
    fetch("http://localhost:64755/Api/grocery")
    .then(result => {
      return result.json();
    })
    .then(data =>
      this.setState({ Ingredients: data.Ingredients })
    );
  }

  render() {
    return (
      <div>
        <GroceryContainer />
        <RecipeContainer recipe={tempRecipe} />
        <RecipeList onclick={this.recipeListClickHandler} />
      </div>
    );
  }

};

export default App;
