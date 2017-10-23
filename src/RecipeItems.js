import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RecipeItems extends Component {
    render() {
        const recipeItems = this.props.ingredients.map((ingredient) =>
            <li key={ingredient.Name.toString()}>{ingredient.Name}</li>
        );
        return (    
        <ul>
            {recipeItems}
        </ul>
        );
    }
}


RecipeItems.propTypes = {
    ingredients: PropTypes.array
};

export default RecipeItems;