import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import RecipeContainer from './RecipeContainer';
import GroceryContainer from './GroceryContainer';
import RecipeList from './RecipeList';
import './App.css';
import appConfig from './settings.json';
import Example from './AutoComplete';

class App extends Component {
  constructor() {
    super();
    this.state = {
      Recipe: null,
    };
  }
  componentDidMount() {
    const settings = appConfig;
    fetch(`${settings.RestServerLocation}/Api/grocery`)
      .then(result => result.json())
      .then(data =>
        this.setState({ Ingredients: data.Ingredients }),
    );
  }

  recipeListAddClickHandler() {
    const settings = appConfig;

    fetch(`${settings.RestServerLocation}/Api/grocery`)
      .then(result => result.json())
      .then((data) => {
        this.setState({ Ingredients: data.Ingredients });
      });
  }

  recipeListViewClickHandler(id) {
    const settings = appConfig;

    fetch(`${settings.RestServerLocation}/Api/recipe/${id}`)
      .then(result => result.json())
      .then((data) => {
        this.setState({ Recipe: data });
      },
    );
  }
  render() {
    return (
      <div className="Main">
        <Jumbotron>
          <h1 className="display-3">Hello</h1>
          <p className="lead">
            Welcome to my site where you can build recipes and create grocery lists.
          </p>
        </Jumbotron>
        <Container fluid>
        <Row>
            <Col xs="0" lg="2" />
            <Col xs="12" lg="8">alalala<Example /></Col>
            <Col xs="0" lg="2" />
          </Row>
          <Row>
            <Col xs="0" lg="2" />
            <Col xs="12" lg="8"><GroceryContainer groceryList={this.state.Ingredients} /></Col>
            <Col xs="0" lg="2" />
          </Row>
          <Row>
            <Col xs="0" lg="2" />
            <Col xs="12" lg="8">
              <RecipeList
                addclick={e => this.recipeListAddClickHandler(e)}
                viewclick={e => this.recipeListViewClickHandler(e)}
              />
            </Col>
            <Col xs="0" lg="2" />
          </Row>
          <Row>
            <Col xs="0" lg="2" />
            <Col xs="12" lg="8"><RecipeContainer recipe={this.state.Recipe} /></Col>
            <Col xs="0" lg="2" />
          </Row>
          <Row>
            <Col xs="12">
              <div>ffses asdasadsfasadsdds</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
