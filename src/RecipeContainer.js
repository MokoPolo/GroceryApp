import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeItems from './RecipeItems';

class RecipeContainer extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        console.log('in recipecontainer render');
        console.log(this.props.recipe);
        if (this.props.recipe) {
            return (
                <div>
                    <h2>Recipe name: {this.props.recipe.Name}</h2>
                    <RecipeItems ingredients={this.props.recipe.Ingredients} />
                </div>);
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

RecipeContainer.propTypes = {
    recipe: PropTypes.object
};

export default RecipeContainer;