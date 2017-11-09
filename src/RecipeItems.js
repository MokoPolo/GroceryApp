import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeItems extends Component {
  render() {
    if (!this.props.ingredients || this.props.ingredients.length === 0) {
      return <div>Loading...</div>;
    }
    const recipeItems = this.props.ingredients.map(ingredient =>
      <li key={ingredient.Name}>{ingredient.Name}</li>,
    );
    return (
      <ul>
        {recipeItems}
      </ul>
    );
  }

}


RecipeItems.propTypes = {
  ingredients: PropTypes.array,
};

export default RecipeItems;
