import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroceryItems from './GroceryItems';
import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import './App.css';

class GroceryContainer extends Component {
    constructor() {
        super();
        this.state = {
            Ingredients: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:64755/Api/grocery")
            .then(result => {
                return result.json();
            })
            .then(data => {
                const arr = data.Ingredients;
                this.setState({ Ingredients: arr })
            }
            );
    }

    render() {
        if (!this.state.Ingredients.length === 0) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Card>
                    <CardHeader className="color1">Grocery List</CardHeader>
                    <CardBody>
                        <CardText><GroceryItems ingredients={this.state.Ingredients} /></CardText>
                    </CardBody>
                </Card>

            </div >);
    }
}

GroceryContainer.propTypes = {
    groceryList: PropTypes.object,
};

export default GroceryContainer;