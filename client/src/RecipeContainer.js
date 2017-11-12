import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeItems from './RecipeItems';
import { Card, CardBody, CardText, CardHeader } from 'reactstrap';

class RecipeContainer extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    if (this.props.recipe) {
      return (
        <div>
          <Card className="card-modified">
            <CardHeader >Recipe name: {this.props.recipe.Name}</CardHeader>
            <CardBody>
              <CardText>
                <RecipeItems ingredients={this.props.recipe.Ingredients} />
              </CardText>
            </CardBody>
          </Card>
        </div>);
    }

    return (
      <div />
    );
  }
}

RecipeContainer.propTypes = {
  recipe: PropTypes.object,
};

export default RecipeContainer;
