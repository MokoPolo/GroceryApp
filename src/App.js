import React, { Component } from 'react';
import RecipeContainer from './RecipeContainer';
import GroceryContainer from './GroceryContainer';
import RecipeList from './RecipeList';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import './App.css';

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
        <Jumbotron className="pageheader">
          {/* <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p> */}
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col xs="2"></Col>
            <Col xs="8"><GroceryContainer /></Col>
            <Col xs="2"></Col>
          </Row>
          <Row>
            <Col xs="2"></Col>
            <Col xs="8"><RecipeList addclick={this.recipeListAddClickHandler} viewclick={this.recipeListViewClickHandler} /></Col>
            <Col xs="2"></Col>
          </Row>
          <Row>
            <Col xs="2"></Col>
            <Col xs="8"><RecipeContainer recipe={this.state.Recipe} /></Col>
            <Col xs="2"></Col>
          </Row>
        </Container>
        
        
        
      </div>
    );
  }

};

export default App;
