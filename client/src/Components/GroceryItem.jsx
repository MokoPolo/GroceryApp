import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, ListGroupItemText, Button, Row, Col } from 'reactstrap';
import {
  toggleGroceryItem,
} from '../Actions/ActionCreators';

const GroceryItem = ({ Id, Done, Name, Quantity, showDone, toggleGroceryItem, groceryEditItemModalHandler }) => {
   if (!Id) {
    return <div>Loading...</div>;
  }
  else {
    let strikeclassname;
    if (Done === true) {
      if (showDone === true) {
        strikeclassname = 'strike';
      } else {
        return null;
      }
    } else {
      strikeclassname = 'nostrike';
    }
    const itemClass = `TransparentBackground NoBorders ${strikeclassname}`;

    return (
      <ListGroupItemText key={Id} className={itemClass} tag="div">
        <Row>
          <Col xs="1" lg="1" className="align-middle">
            <Input
              type="checkbox"
              defaultChecked={Done}
              onChange={() => toggleGroceryItem(Id, !Done)}
            /></Col>
          <Col xs="10" lg="8">
            {Name} (Qty:{Quantity})
                  </Col>
          <Col xs="1" lg="3">
            <Button onClick={() => groceryEditItemModalHandler(Id)} >Edit item</Button>
          </Col>
        </Row>
      </ListGroupItemText>
    );
  }
}

GroceryItem.propTypes = {
  Id: PropTypes.number,
  Done: PropTypes.bool,
  Name: PropTypes.string,
  Quantity: PropTypes.number,
  showDone: PropTypes.bool,
};

GroceryItem.defaultProps = {
  showDone: false,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleGroceryItem: (id, done) => {
    dispatch(toggleGroceryItem(id, done));
  },
})

export default connect(
  null,
  mapDispatchToProps
)(GroceryItem);
