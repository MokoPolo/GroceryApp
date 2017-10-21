import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecipeItems from './RecipeItems';

class RecipeContainer extends Component {
    render() {
        return (    
        <div>
            <h2>Recipe name: {this.props.recipe.Name}</h2>
            <RecipeItems ingredients={this.props.recipe.Ingredients}/>
        </div>);
    }
}

RecipeContainer.propTypes = {
    recipe: PropTypes.object,
    //name: React.PropTypes.string
};

export default RecipeContainer;