import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RecipeItems = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return (<div>Loading...</div>);
  }
  else {
    const recipeItems = ingredients.map(ingredient =>
      <li key={ingredient.Name}>{ingredient.Name}</li>);
    return (
      <ul> {recipeItems}</ul>
    );
  }
}

RecipeItems.propTypes = {
  ingredients: PropTypes.array,
};

export default RecipeItems;
