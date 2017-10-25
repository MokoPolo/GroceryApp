import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeList extends Component {
    constructor() {
        super();
        this.state = { Names: [] };

        //this.handleClick = this.handleClick.bind(this);
    } 

    componentDidMount() {
        fetch("http://localhost:64755/Api/recipe")
            .then(result => {
                return result.json();
            })
            .then(data => {
                this.setState({ Names: data })
            });
    }  

    /*handleClick(id) {
        debugger;
        console.log(id);
        //this.props.onclick();
      }*/

    render() {
        const recipeListItems = this.state.Names.map((recipeName) =>
            <li key={recipeName.Name.toString()} item={recipeName.Name}>{recipeName.Name}<button onClick={() => (this.props.onclick(recipeName.Id))}>Add</button></li>
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
    listofRecipes: PropTypes.array,
    onclick: PropTypes.func
};

export default RecipeList;