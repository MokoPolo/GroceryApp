import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardHeader, Col } from 'reactstrap';
import appConfig from './settings.json';

class RecipeList extends Component {
  constructor() {
    super();
    this.state = { Names: [], loadingMessage: '' };
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
      const recipeListItems = this.state.Names.map((name) => 
        <RecipeListItem Name={name.Name} key={name.Id} addclick={this.props.addclick} viewclick={this.props.viewclick} />
      );
    return (
      <div>
        <Card className="card-modified">
          <CardHeader>Recipe List</CardHeader>
          <CardBody>
            <CardText>
              {this.props.loadingMessage}
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
  
  render() {
    debugger;
    return (
      <li key={this.props.Name.toString()} className="row" item={this.props.Name}>
        <Col xs="12" md="6">{this.props.Name}</Col>
        <Col xs="12" md="6">
          <Button size="sm" onClick={() => this.props.addclick(this.props.Id)}>Add to grocery list</Button>
          <Button size="sm" onClick={() => this.props.viewclick(this.props.Id)}>View recipe</Button>

        </Col>
      </li>);
  }
}

RecipeList.propTypes = {
  listofRecipes: PropTypes.array,
  addclick: PropTypes.func,
  viewclick: PropTypes.func,
  loadingMessage: PropTypes.string,
};
RecipeListItem.propTypes = {
  addclick: PropTypes.func,
  viewclick: PropTypes.func,
  Id: PropTypes.number,
  Name: PropTypes.string,
};
export default RecipeList;
