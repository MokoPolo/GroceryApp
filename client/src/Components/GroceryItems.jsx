import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import GroceryItem from './GroceryItem';
import appConfig from '../settings.json';

const GroceryItems = ({ingredients, title, editItemClick, showDone}) => {
  if (!ingredients || ingredients.length === 0){
    return null;
  }
  const GroceryItems2 = ingredients.map(ingredient => (
    <GroceryItem
      key={ingredient.Id}
      {...ingredient}
      showDone={showDone}
      editItemClick={(id) => editItemClick(id)}
    />
  ));
  if (GroceryItems2.length === 0) {
    return <div />;
  }

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
  ingredients: (PropTypes.array).isRequired,
  title: (PropTypes.string).isRequired,
  showDone: PropTypes.bool,
  editItemClick: PropTypes.func,
};

GroceryItems.defaultProps = {
  showDone: false,
  editItemClick: null,
  ingredients: [],
};

export default GroceryItems;
