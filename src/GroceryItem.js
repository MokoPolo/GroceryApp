import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';

class GroceryItem extends Component {
    constructor() {
        super();
        this.state = {
            ingredient: null
        };
    }

    toggle() {
        let newIngredient = {...this.state.ingredient};
        newIngredient.Done = !this.state.ingredient.Done;
        this.setState({ingredient:newIngredient});
        this.props.toggleItemClick(this.state.ingredient.Id, newIngredient.Done)
    }
    componentDidMount() {
        this.setState({ ingredient: this.props.ingredient });
    }
    render() {
        let strikeclassname;

        if (!this.state.ingredient) {
            return <div>Loading...</div>;
        }

        if (this.state.ingredient.Done === true) {
            strikeclassname = "strike";
        }
        else {
            strikeclassname = "nostrike";
        }
        const itemClass = "TransparentBackground NoBorders " + strikeclassname;

        return (
            <ListGroupItem key={this.state.ingredient.Id} className={itemClass}>
                <Input type="checkbox" defaultChecked={this.state.ingredient.Done} onChange={this.toggle.bind(this)} /> {this.state.ingredient.Name}
            </ListGroupItem>)
    }
}

GroceryItem.propTypes = {
    ingredient: PropTypes.object,
    toggleItemClick: PropTypes.func
};

export default GroceryItem;