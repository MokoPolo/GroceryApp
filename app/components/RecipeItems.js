import React, {Component, PropTypes} from 'react';

class RecipeItems extends Component {
    //alert("hi");
    render() {
        debugger;
        const recipeItems = this.props.ingredients.map((ingredient) =>
            <li key={ingredient.toString()} item={ingredient}>{ingredient}</li>
        );
        return (    
        <ul>
            {recipeItems}
        </ul>
        );
    }
}


RecipeItems.propTypes = {
    ingredients: React.PropTypes.array
};

export default RecipeItems;