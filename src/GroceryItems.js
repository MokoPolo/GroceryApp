import React from 'react';
import PropTypes from 'prop-types';

const GroceryItems = ({ ingredients }) => {
    const GroceryItems = ingredients.map((ingredient) =>
        <li key={ingredient.Name}>{ingredient.Name}</li>
    );
    return (
        <ul>
            {GroceryItems}
        </ul>
    );
}

GroceryItems.propTypes = {
    ingredients: PropTypes.array
};

export default GroceryItems;