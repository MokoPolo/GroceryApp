import React from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import GroceryItem from './GroceryItem';

const GroceryItems = ({ toggleItemClick, ingredients, title }) => {
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
                <ListGroupItem className="TransparentBackground">
                    <ListGroupItemHeading>{title}</ListGroupItemHeading>
                    {GroceryItems2}
                </ListGroupItem>
                
            </ListGroup>
        </div>
    );
}

GroceryItems.propTypes = {
    ingredients: PropTypes.array,
    toggleItemClick: PropTypes.func,
    title: PropTypes.string

};

export default GroceryItems;



/* tomorrow convert to <ListGroupItemText>
also make groceryitems a container for meat/chicken and fruit/veggie and other
also be able to accept a filter. ie only use items that category is meat/chicken
or instead of groupitem use accordian (class Collapse) */