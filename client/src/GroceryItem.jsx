import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroupItemText } from 'reactstrap';

class GroceryItem extends Component {
  constructor() {
    super();
    this.state = {
      ingredient: null,
    };
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    this.setState({ ingredient: this.props.ingredient });
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
        <Input
          type="checkbox"
          defaultChecked={this.state.ingredient.Done}
          onChange={this.toggle}
        />
        {this.state.ingredient.Name}
      </ListGroupItemText>);
  }
}

GroceryItem.propTypes = {
  ingredient: PropTypes.shape({
    Id: PropTypes.number,
    Done: PropTypes.bool,
    Name: PropTypes.string,
  }).isRequired,
  showDone: PropTypes.bool,
  toggleItemClick: PropTypes.func,
};

GroceryItem.defaultProps = {
  showDone: false,
  toggleItemClick: null,
};

export default GroceryItem;
