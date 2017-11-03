import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import './App.css';
import appConfig from './settings.json';

class GroceryAddItem extends Component {

    addItemClickHandler = (name) => {
        // Call service with string name
        console.log("addItemClickHandler");
        debugger;
        const settings = appConfig;

        // Post to service. Add recipe ingredients to grocery list
        /*             fetch(settings.RestServerLocation + "/Api/grocery", {
                      method: "POST",
                      headers: {
                        "Accept": 'application/JSON',
                        "Content-Type": "application/JSON"
                      },
                      body: JSON.stringify(
                        name
                      )
                    }).then(result => {
                
                      // Clear control
                      // Fire itemCreated event 
                    }) */

    }

    onChangeClickHandler = (e) => {
        // Maybe do auto complete here
        console.log("onChangeClickHandler");
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <Input onChange={this.onChangeClickHandler} />&nbsp;
                    <InputGroupButton><Button onClick={this.addItemClickHandler}>Add item</Button></InputGroupButton>
                </InputGroup>
            </div>
        );
    }
};


export default GroceryAddItem;