import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Recipe from './Components/Recipe';
import './App.css';
import appConfig from './settings.json';
import RecipeListContainer from './Containers/RecipeListContainer';
import GroceryContainer from './Containers/GroceryContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      Ingredients: [],
    };
  }
  componentDidMount() {
    const settings = appConfig;
    fetch(`${settings.RestServerLocation}/Api/grocery`)
      .then(result => result.json())
      .then(data =>
        this.setState({ Ingredients: data.Ingredients }));
  }


  render() {
    return (
      <div className="Main">
        <Jumbotron>
          <h1 className="display-3">Hello</h1>
          <p className="lead">
            Welcome to my site where you can build recipes and create grocery lists
          </p>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col xs="0" lg="2" />
            <Col xs="12" lg="8"><GroceryContainer groceryList={this.state.Ingredients} /></Col>
            <Col xs="0" lg="2" />
          </Row>
          <Row>
            <Col xs="0" lg="2" />
            <Col xs="12" lg="8">
              <RecipeListContainer />
            </Col>
            <Col xs="0" lg="2" />
          </Row>
          <Row>
            <Col xs="0" lg="2" />
            <Col xs="12" lg="8"><Recipe recipe={this.props.Recipe} /></Col>
            <Col xs="0" lg="2" />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Recipe: state.recipeReducer.Recipe,
});

/* const App = connect(
  mapStateToProps,
  null,
  )(App); */
export default connect(
  mapStateToProps,
  null,
  )(App);
