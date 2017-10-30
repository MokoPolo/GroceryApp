import React from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import GroceryItem from './GroceryItem';

const GroceryItems = ({ toggleItemClick, ingredients }) => {
    /*     const GroceryItems = ingredients.map((ingredient) =>
            <li key={ingredient.Name}>{ingredient.Name}</li>
        ); */

    const GroceryItems2 = ingredients.map((ingredient) => {
        return (
            <GroceryItem key={ingredient.Id} ingredient={ingredient} toggleItemClick={toggleItemClick()} />
        )
    });
    return (
        <div>
            <ListGroup className="TransparentBackground">
                {GroceryItems2}
            </ListGroup>
        </div>
    );
}

GroceryItems.propTypes = {
    ingredients: PropTypes.array,
    toggleItemClick: PropTypes.func
};

export default GroceryItems;