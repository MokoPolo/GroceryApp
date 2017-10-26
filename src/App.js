import React, { Component } from 'react';
import RecipeContainer from './RecipeContainer';
import GroceryContainer from './GroceryContainer';
import RecipeList from './RecipeList';

/*const tempRecipe = {
  "Name": "Awesome steak",
  "Ingredients": [
    "rib steak",
    "rosemary"
  ]
};*/
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
  constructor() {
    super();
    this.state = {
      Recipe: null
    };
  }
  componentDidMount() {
    fetch("http://localhost:64755/Api/grocery")
      .then(result => {
        return result.json();
      })
      .then(data =>
        this.setState({ Ingredients: data.Ingredients })
      );
  }

  recipeListAddClickHandler = (id) => {
    console.log("in recipeListAddClickHandler " + id);

    // Post to service
    fetch("http://localhost:64755/Api/grocery", {
      method: "POST",
      headers: {
        "Accept": 'application/JSON',
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify({
        id
      })
    }).then(result => {
      return result.json();
    }).then(data => {
      console.log('asfd');
    })


    // Then update grocery list
    fetch("http://localhost:64755/Api/grocery")
      .then(result => {
        console.log(result);
        return result.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ Ingredients: data.Ingredients });
      });
  }

  recipeListViewClickHandler = (id) => {
    console.log("in recipeListViewClickHandler " + id);

    fetch("http://localhost:64755/Api/recipe/" + id)
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log(data);
        //const foo = data;
        this.setState({ Recipe: data })
      }
      )
      .catch(e => {
        console.log(e)
        return e;
      });
  }
  render() {
    console.log('look here');
    console.log(this.state.Recipe);
    return (
      <div>
        <GroceryContainer />
        <RecipeList addclick={this.recipeListAddClickHandler} viewclick={this.recipeListViewClickHandler} />
        <RecipeContainer recipe={this.state.Recipe} />
      </div>
    );
  }

};

export default App;
