import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import GroceryItem from './GroceryItem';
import appConfig from './settings.json';

class GroceryItems extends Component {
  constructor() {
    super();
    this.groceryItemClickHandler = this.groceryItemClickHandler.bind(this);
    this.groceryEditItemModalHandler = this.groceryEditItemModalHandler.bind(this);
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
    });
  }
  groceryEditItemModalHandler(selectedId) {
    this.props.editItemClick(selectedId);
  }
  render() {
    const GroceryItems2 = this.props.ingredients.map(ingredient => (
      <GroceryItem
        key={ingredient.Id}
        showDone={this.props.showDone}
        ingredient={ingredient}
        toggleItemClick={this.groceryItemClickHandler}
        editItemClick={this.groceryEditItemModalHandler}
      />
    ));
    if (GroceryItems2.length === 0) {
      return <div />;
    }

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
