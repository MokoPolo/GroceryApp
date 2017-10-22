import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeItems from './RecipeItems';

class RecipeContainer extends Component {
    componentDidMount() {
        fetch("http://localhost:64755/Api/recipe/1")
            .then(result => {
                return result.json();
            })
            .then(data => {

                //const foo = data;
                this.setState({ Recipe: data })
            }
            );
    }
    render() {
        debugger;
        if (this.state && this.state.Recipe) {
            return (
                <div>
                    <h2>Recipe name: {this.state.Recipe.Name}</h2>
                    <RecipeItems ingredients={this.state.Recipe.Ingredients} />
                </div>);
        }
        else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

RecipeContainer.propTypes = {
    recipe: PropTypes.object
};

export default RecipeContainer;