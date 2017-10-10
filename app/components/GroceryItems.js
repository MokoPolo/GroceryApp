import React, {Component, PropTypes} from 'react';

class GroceryItems extends Component {
    //alert("hi");
    render() {
        debugger;
        const GroceryItems = this.props.ingredients.map((ingredient) =>
            <li key={ingredient.toString()} item={ingredient}>{ingredient}</li>
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