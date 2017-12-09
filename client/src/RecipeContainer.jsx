import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText, CardHeader } from 'reactstrap';
import RecipeItems from './RecipeItems';

const RecipeContainer = ({ recipe }) => {
  if (recipe !== null) {
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

RecipeContainer.propTypes = {
  recipe: PropTypes.shape({
    Id: PropTypes.number,
    Name: PropTypes.string,
    Ingredients: PropTypes.array,
  }).isRequired,
};

export default RecipeContainer;
