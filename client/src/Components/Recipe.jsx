import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText, CardHeader } from 'reactstrap';
import RecipeItems from './RecipeItems';

const Recipe = ({ recipe }) => {
  if (recipe) {
    return (
      <div>
        <Card className="card-modified">
          <CardHeader >Recipe name: {recipe.Name}</CardHeader>
          <CardBody>
            <CardText tag="div">
              <RecipeItems ingredients={recipe.Ingredients} />
            </CardText>
          </CardBody>
        </Card>
      </div>);
  }
  return (
    <div />
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    Id: PropTypes.number,
    Name: PropTypes.string,
    Ingredients: PropTypes.array,
  }).isRequired,
};

export default Recipe;
