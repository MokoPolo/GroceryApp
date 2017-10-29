import React from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
const GroceryItems = ({ toggleItemClick, ingredients }) => {
    /*     const GroceryItems = ingredients.map((ingredient) =>
            <li key={ingredient.Name}>{ingredient.Name}</li>
        ); */
    const GroceryItems2 = ingredients.map((ingredient) => {

/*         let strikeclassname;
        if (ingredient.Done === true) {
            strikeclassname = "strike";
        }
        else {
            strikeclassname = "nostrike";
        }
        const itemClass = "TransparentBackground NoBorders " + strikeclassname; */
        <ListGroupItem><Input type="checkbox" onClick={() => toggleItemClick(ingredient.Id)} /> {ingredient.Name}</ListGroupItem>
        {/* <ListGroupItem key={ingredient.Id} className="TransparentBackground NoBorders"><Input type="checkbox" onClick={() => toggleItemClick(ingredient.Id)} /> {ingredient.Name}</ListGroupItem> */}
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