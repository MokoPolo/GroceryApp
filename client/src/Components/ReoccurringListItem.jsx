import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import appConfig from '../settings.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import {
    addReoccurringItemToGroceryList,
    requestAddReoccurringItemToGroceryList,
} from '../Actions/ActionCreators';

class ReoccurringListItem extends Component {
    constructor() {
        super();
        this.recipeListAddClickHandler.bind(this);
    }

    recipeListAddClickHandler(id) {
        this.props.requestAddReoccurringItemToGroceryList(this.props.Id);
        this.props.addReoccurringItemToGroceryList(this.props.Id);
    }
    render() {
        let spinner = <FontAwesome name="spinner" spin />;;
        return (
            <li key={this.props.Name.toString()} className="row" item={this.props.Name}>
                <Col xs="12" md="6">{this.props.Name}</Col>
                <Col xs="12" md="6">
                    <Button size="sm" onClick={() => this.recipeListAddClickHandler(this.props.Id)}>Add to grocery list</Button>
                    {this.props.isAddingIngredientToGroceryList ? spinner : ""}
                </Col>
            </li>);
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.groceryReducer.ReoccurringIngredients,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addReoccurringItemToGroceryList: (id) => {
        dispatch(addReoccurringItemToGroceryList(id));
    },
    requestAddReoccurringItemToGroceryList: (id) => {
        dispatch(requestAddReoccurringItemToGroceryList(id));
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReoccurringListItem);