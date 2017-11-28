import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardHeader, Col } from 'reactstrap';
import appConfig from './settings.json';
import FontAwesome from 'react-fontawesome';
class RecipeList extends Component {
  constructor() {
    super();
    this.state = { Names: [] };
  }

  componentDidMount() {
    const settings = appConfig;
    fetch(`${settings.RestServerLocation}/Api/recipe`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(result => result.json())
      .then((data) => {
        this.setState({ Names: data });
      });
  }

  render() {
    const recipeListItems = this.state.Names.map(name =>
      <RecipeListItem Name={name.Name} Id={name.Id} key={name.Id} addclick={id => this.props.addclick(id)} viewclick={id => this.props.viewclick(id)} />);
    return (
      <div>
        <Card className="card-modified">
          <CardHeader>Recipe List</CardHeader>
          <CardBody>
            <CardText>
              <ul>
                { recipeListItems }
              </ul>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

class RecipeListItem extends Component {
  constructor() {
    super();
    this.state = { loading: false, };
  }

  recipeListAddClickHandler(id) {
    const settings = appConfig;
    this.setState({ loading: true });
    // Post to service. Add recipe ingredients to grocery list
    fetch(`${settings.RestServerLocation}/Api/grocery/${id}`, {
      method: 'POST',
      /*       headers: {
              "Accept": 'application/JSON',
              "Content-Type": "application/JSON"
            },
            body: JSON.stringify(
              id
            ) */
    }).then((result) => {
      this.setState({ loading: false });
      this.props.addclick(id);
    });
  }
  render() {
    let spinner = '';
    if (this.state.loading)
    {
        spinner = <FontAwesome name='spinner' spin />;
    }
    return (
      <li key={this.props.Name.toString()} className="row" item={this.props.Name}>
        <Col xs="12" md="6">{this.props.Name}</Col>
        <Col xs="12" md="6">
          <Button size="sm" onClick={() => this.recipeListAddClickHandler(this.props.Id)}>Add to grocery list</Button>
          <Button size="sm" onClick={() => this.props.viewclick(this.props.Id)}>View recipe</Button>
          { spinner }
        </Col>
      </li>);
  }
}

RecipeList.propTypes = {
  listofRecipes: PropTypes.array,
  addclick: PropTypes.func,
  viewclick: PropTypes.func,
};
RecipeListItem.propTypes = {
  addclick: PropTypes.func,
  viewclick: PropTypes.func,
  Id: PropTypes.number,
  Name: PropTypes.string,
};
export default RecipeList;
