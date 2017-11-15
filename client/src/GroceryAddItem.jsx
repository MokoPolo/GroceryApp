import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './App.css';
import Example from './AutoComplete';
import appConfig from './settings.json';

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
        const settings = appConfig;
        
                // Post to service. Add recipe ingredients to grocery list
            fetch(`${settings.RestServerLocation}/Api/grocery`, {
              method: 'POST',
              headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON',
              },
              body:
                    JSON.stringify({
                      Name: this.state.inputValue,
                      Id: -1,
                      Done: false,
        
                    }),
            }).then(() => {
              this.props.addItemClick(this.state.inputValue);
              this.setState({ inputValue: '' });
            });

  }
  render() {
    return (
      <div>
        <InputGroup>
        <Example />
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
