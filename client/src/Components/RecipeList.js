import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardHeader, Col } from 'reactstrap';
import appConfig from '../settings.json';
import FontAwesome from 'react-fontawesome';
import RecipeListItem from './RecipeListItem';
class RecipeList extends Component {
  componentDidMount() {
    this.props.getRecipeList();
  }

  render() {
    let recipeListItems;
    if (this.props.RecipeList) {
      recipeListItems = this.props.RecipeList.map(recipe =>
        <RecipeListItem Name={recipe.Name} Id={recipe.Id} key={recipe.Id} Loading={recipe.isAddingToGroceryList} />);
    }
    return (
      <div>
        <Card className="card-modified">
          <CardHeader>Recipe List</CardHeader>
          <CardBody>
            <CardText tag="div">
              <ul>
                {recipeListItems}
              </ul>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}


RecipeList.propTypes = {
  recipeList: PropTypes.array,
  addclick: PropTypes.func,
  viewclick: PropTypes.func,
};

export default RecipeList;
