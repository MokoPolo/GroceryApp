import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeList extends Component {
    constructor() {
        super();
        this.state = { Names: [] };
    }

    componentDidMount() {
        fetch("http://localhost:64755/Api/recipe")
            .then(result => {
                return result.json();
            })
            .then(data => {
                this.setState({ Names: data.map(recipe => recipe.Name) })
            })
            .catch(e => {
                console.log(e)
                return e;
            });
    }    
    render() {
        const recipeListItems = this.state.Names.map((recipeName) =>
            <li key={recipeName.toString()} item={recipeName}>{recipeName}</li>
        );
        return (
            <div>
                <h2>Recipe List</h2>
                <ul>
                    {recipeListItems}
                </ul>
            </div>
        );
    }
};

RecipeList.propTypes = {
    listofRecipes: PropTypes.array
};

export default RecipeList;