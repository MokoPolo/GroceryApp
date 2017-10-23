import React, {Component} from 'react';
import PropTypes from 'prop-types';

class GroceryItems extends Component {
    render() {
        const GroceryItems = this.props.ingredients.map((ingredient) =>
            <li key={ingredient.Name}>{ingredient.Name}</li>
        );
        return (    
        <ul>
            {GroceryItems}
        </ul>
        );
    }
}


GroceryItems.propTypes = {
    ingredients: PropTypes.array
};

export default GroceryItems;