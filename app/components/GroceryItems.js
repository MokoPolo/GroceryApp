import React, {Component, PropTypes} from 'react';

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
    ingredients: React.PropTypes.array
};

export default GroceryItems;