import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RecipeItems extends Component {
    //alert("hi");
    render() {
        const recipeItems = this.props.ingredients.map((ingredient) =>
            <li key={ingredient.toString()}>{ingredient}</li>
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