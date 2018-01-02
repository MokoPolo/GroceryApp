import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardHeader, Col } from 'reactstrap';
import appConfig from '../settings.json';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import {
    selectRecipe,
    addRecipeToGroceryList,
    getRecipeList,
    getGroceryList,
} from '../Actions/ActionCreators';

class RecipeListItem extends Component {
    render() {
      let spinner = '';
      if (this.props.Loading) {
        spinner = <FontAwesome name="spinner" spin />;
      }
      return (
        <li key={this.props.Name.toString()} className="row" item={this.props.Name}>
          <Col xs="12" md="6">{this.props.Name}</Col>
          <Col xs="12" md="6">
            <Button size="sm" onClick={() => this.props.addRecipeToGroceryList(this.props.Id)}>Add to grocery list</Button>
            <Button size="sm" onClick={() => this.props.viewRecipeClick(this.props.Id)}>View recipe</Button>
            {spinner}
          </Col>
        </li>);
    }
  }

  RecipeListItem.propTypes = {
    addRecipeToGroceryList: PropTypes.func,
    viewRecipeClick: PropTypes.func,
    Id: PropTypes.number,
    Name: PropTypes.string,
    Loading: PropTypes.bool
  };

  const mapStateToProps = (state) => {
    return{
        RecipeList: state.recipeReducer.RecipeList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addRecipeToGroceryList: (id) => {
        dispatch(addRecipeToGroceryList(id));
    },
    viewRecipeClick: (id) => {
        dispatch(selectRecipe(id));
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(RecipeListItem); 