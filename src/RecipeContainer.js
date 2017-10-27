import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeItems from './RecipeItems';
import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';

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
                <Card>
                    <CardHeader className="color2">Recipe name: {this.props.recipe.Name}</CardHeader>
                    <CardBody>
                        <CardText>
                        <RecipeItems ingredients={this.props.recipe.Ingredients} />
                        </CardText>
                    </CardBody>
                </Card>
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