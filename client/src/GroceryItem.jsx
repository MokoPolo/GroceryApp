import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroupItemText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

class GroceryItem extends Component {
  constructor() {
    super();
    this.state = {
      ingredient: null,
    };
    this.toggle = this.toggle.bind(this);
    this.groceryEditItemModalHandler = this.groceryEditItemModalHandler.bind(this);
  }
  componentWillMount() {
    this.setState({ ingredient: this.props.ingredient });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ingredient: nextProps.ingredient });
  }
  groceryEditItemModalHandler() {
    this.props.editItemClick(this.state.ingredient.Id);
  }
  toggle() {
    const newIngredient = { ...this.state.ingredient };
    newIngredient.Done = !this.state.ingredient.Done; // change done status
    this.setState({ ingredient: newIngredient }); // set new state

    /*     this.setState(prevState => {
      return {ingredient: { ...prevState.ingredient }, Done: !prevState.ingredient.Done};
    }, () => {
      this.props.toggleItemClick(this.state.ingredient.Id, this.state.ingredient.Done);
    }); */
    this.props.toggleItemClick(newIngredient.Id, newIngredient.Done);
  }
  render() {
    let strikeclassname;

    if (!this.state.ingredient) {
      return <div>Loading...</div>;
    }

    if (this.state.ingredient.Done === true) {
      if (this.props.showDone === true) {
        strikeclassname = 'strike';
      } else {
        return null;
      }
    } else {
      strikeclassname = 'nostrike';
    }
    const itemClass = `TransparentBackground NoBorders ${strikeclassname}`;

    return (
      <ListGroupItemText key={this.state.ingredient.Id} className={itemClass}>
        <Row>
          <Col xs="1" lg="1" className="align-middle">
            <Input
              type="checkbox"
              defaultChecked={this.state.ingredient.Done}
              onChange={this.toggle}
            /></Col>
          <Col xs="10" lg="8">
            {this.state.ingredient.Name} (Qty:{this.state.ingredient.Quantity})
            </Col>
          <Col xs="1" lg="3">
            <Button onClick={this.groceryEditItemModalHandler} >Edit item</Button>
          </Col>
        </Row>
      </ListGroupItemText>
    );
  }
}

GroceryItem.propTypes = {
  ingredient: PropTypes.shape({
    Id: PropTypes.number,
    Done: PropTypes.bool,
    Name: PropTypes.string,
    Quantity: PropTypes.number,
  }).isRequired,
  showDone: PropTypes.bool,
  editItemClick: PropTypes.func,
  toggleItemClick: PropTypes.func,
  fuckyou: PropTypes.string,
};

GroceryItem.defaultProps = {
  showDone: false,
  toggleItemClick: null,
  editItemClick: null,
};

export default GroceryItem;
