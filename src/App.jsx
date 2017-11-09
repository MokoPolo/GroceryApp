import React, { Component } from 'react';
import RecipeContainer from './RecipeContainer';
import GroceryContainer from './GroceryContainer';
import RecipeList from './RecipeList';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import './App.css';
import appConfig from './settings.json';

// Stateless component
class App extends Component {
  constructor() {
    super();
    this.state = {
      Recipe: null,
      LoadingMessage: ""
    };
  }
  componentDidMount() {
    const settings = appConfig;
    fetch(settings.RestServerLocation + "/Api/grocery")
      .then(result => {
        return result.json();
      })
      .then(data =>
        this.setState({ Ingredients: data.Ingredients })
      ).catch(foo => {
        console.log("In catch and it doesn't look good");
      });
  }

  recipeListAddClickHandler = (id) => {
    const settings = appConfig;
    this.setState({ LoadingMessage: "loading..."});
    // Post to service. Add recipe ingredients to grocery list
    fetch(settings.RestServerLocation + "/Api/grocery/" + id, {
      method: "POST",
/*       headers: {
        "Accept": 'application/JSON',
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(
        id
      ) */
    }).then(result => {
      this.setState({ LoadingMessage: "Complete"});
      // Get updated grocery list
      fetch(settings.RestServerLocation + "/Api/grocery")
        .then(result => {
          console.log(result);
          return result.json();
        })
        .then(data => {
          console.log(data);
          debugger;
          this.setState({ Ingredients: data.Ingredients });
        });
    })
  }

  recipeListViewClickHandler = (id) => {
    const settings = appConfig;
    

    fetch(settings.RestServerLocation + "/Api/recipe/" + id)
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
    return (
      <div className="Main">
        <Jumbotron>
          <h1 className="display-3">Hello</h1>
          <p className="lead">Welcome to my site where you can build recipes and create grocery lists.</p>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col xs="0" lg="2"></Col>
            <Col xs="12" lg="8"><GroceryContainer groceryList={this.state.Ingredients} /></Col>
            <Col xs="0" lg="2"></Col>
          </Row>
           <Row>
            <Col xs="0" lg="2"></Col>
            <Col xs="12" lg="8"><RecipeList addclick={this.recipeListAddClickHandler} viewclick={this.recipeListViewClickHandler} loadingMessage={this.state.LoadingMessage} /></Col>
            <Col xs="0" lg="2"></Col>
          </Row>
          <Row>
            <Col xs="0" lg="2"></Col>
            <Col xs="12" lg="8"><RecipeContainer recipe={this.state.Recipe} /></Col>
            <Col xs="0" lg="2"></Col>
          </Row>
        </Container>



      </div>
    );
  }

};

export default App;
