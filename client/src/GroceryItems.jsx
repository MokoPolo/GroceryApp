import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import GroceryItem from './GroceryItem';
import appConfig from './settings.json';

class GroceryItems extends Component {
  constructor() {
    super();
    this.groceryItemClickHandler = this.groceryItemClickHandler.bind(this);
  }

  groceryItemClickHandler(id, isDone) {
    const settings = appConfig;
    fetch(`${settings.RestServerLocation}/Api/grocery/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(isDone),
    }).then((result) => {
      console.log('hi');
    }).catch((err) => {
      console.log('bad');
    });
  }

  render() {
    const GroceryItems2 = this.props.ingredients.map(ingredient => (
      <GroceryItem
        key={ingredient.Id}
        showDone={this.props.showDone}
        ingredient={ingredient}
        toggleItemClick={this.groceryItemClickHandler}
      />
    ));
    return (
      <div>
        <ListGroup className="TransparentBackground">
          <ListGroupItem className="TransparentBackground">
            <ListGroupItemHeading>{this.props.title}</ListGroupItemHeading>
            {GroceryItems2}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

GroceryItems.propTypes = {
  ingredients: (PropTypes.arrayOf).isRequired,
  title: (PropTypes.string).isRequired,
  showDone: PropTypes.bool,
};

GroceryItems.defaultProps = {
  showDone: false,
};

export default GroceryItems;
