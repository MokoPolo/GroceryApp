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
        this.props.toggleItemClick(this.state.ingredient.Id)
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
                <Input type="checkbox" onChange={this.toggle.bind(this)} /> {this.state.ingredient.Name}
            </ListGroupItem>)
    }
}

GroceryItem.propTypes = {
    ingredient: PropTypes.object,
    toggleItemClick: PropTypes.func
};

export default GroceryItem;