import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';

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
                this.setState({ Names: data })
            });
    }

    render() {
        const recipeListItems = this.state.Names.map((recipeName) =>
            <li key={recipeName.Name.toString()} item={recipeName.Name}>{recipeName.Name}
                <Button  color="danger" size="sm" onClick={() => (this.props.addclick(recipeName.Id))}>Add to grocery list</Button>
                <Button color="danger" size="sm" onClick={() => (this.props.viewclick(recipeName.Id))}>View recipe</Button>
            </li>
        );
        return (
            <div>
                <Card>
                    <CardHeader className="color3">Recipe List</CardHeader>
                    <CardBody>
                        <CardText>
                            <ul>
                                {recipeListItems}
                            </ul>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
};

RecipeList.propTypes = {
    listofRecipes: PropTypes.array,
    addclick: PropTypes.func,
    viewclick: PropTypes.func
};

export default RecipeList;