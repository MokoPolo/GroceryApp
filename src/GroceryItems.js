import React, {Component} from 'react';
import PropTypes from 'prop-types';

class GroceryItems extends Component {
    //alert("hi");
    render() {
        const GroceryItems = this.props.ingredients.map((ingredient) =>
            <li key={ingredient.toString()}>{ingredient}</li>
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