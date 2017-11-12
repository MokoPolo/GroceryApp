import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import './App.css';
import appConfig from './settings.json';
import PropTypes from 'prop-types';

class GroceryAddItem extends Component {
    constructor(props) {
        super (props);
        this.state = {
            inputValue: ''
        }
    }

    addItemClickHandler = () => {
        // Call service with string name
        console.log("addItemClickHandler");
        

        this.props.addItemClick(this.state.inputValue);
        this.setState({inputValue: ""})
    }

    onChangeClickHandler = (e) => {
        // Maybe do auto complete here
        console.log("onChangeClickHandler");
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <Input onChange={this.onChangeClickHandler} value={this.state.inputValue} />&nbsp;
                    <InputGroupButton><Button onClick={this.addItemClickHandler}>Add item</Button></InputGroupButton>
                </InputGroup>
            </div>
        );
    }
};

GroceryAddItem.propTypes = {
    addItemClick: PropTypes.func

};

export default GroceryAddItem;