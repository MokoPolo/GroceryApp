import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './App.css';

class GroceryAddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.onChangeClickHandler = this.onChangeClickHandler.bind(this);
    this.addItemClickHandler = this.addItemClickHandler.bind(this);
  }

  onChangeClickHandler(e) {
    // Maybe do auto complete here
    this.setState({
      inputValue: e.target.value,
    });
  }
  addItemClickHandler() {
    // Call service with string name
    this.props.addItemClick(this.state.inputValue);
    this.setState({ inputValue: '' });
  }
  render() {
    return (
      <div>
        <InputGroup>
          <Input onChange={this.onChangeClickHandler} value={this.state.inputValue} />&nbsp;
          <InputGroupButton>
            <Button onClick={this.addItemClickHandler}>Add item</Button>
          </InputGroupButton>
        </InputGroup>
      </div>
    );
  }
}

GroceryAddItem.propTypes = {
  addItemClick: PropTypes.func,
};
GroceryAddItem.defaultProps = {
  addItemClick: null,
};
export default GroceryAddItem;
