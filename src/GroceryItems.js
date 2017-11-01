import React from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
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
                <ListGroupItem className="TransparentBackground">
                    <ListGroupItemHeading>List group item heading</ListGroupItemHeading>    
                    <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
                </ListGroupItem>    
                zz{GroceryItems2}qq
            </ListGroup>
        </div>
    );
}

GroceryItems.propTypes = {
    ingredients: PropTypes.array,
    toggleItemClick: PropTypes.func
};

export default GroceryItems;



tomorrow convert to <ListGroupItemText>
also make groceryitems a container for meat/chicken and fruit/veggie and other
also be able to accept a filter. ie only use items that category is meat/chicken
or instead of groupitem use accordian (class Collapse)