import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardHeader, Col } from 'reactstrap';
import appConfig from './settings.json';

class RecipeList extends Component {
    constructor() {
        super();
        this.state = { Names: [] };
    }



    componentDidMount() {
        const settings = appConfig;
        fetch(settings.RestServerLocation + "/Api/recipe", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }    
        })
            .then(result => {
                return result.json();
            })
            .then(data => {
                this.setState({ Names: data })
            });
    }

    render() {
        const recipeListItems = this.state.Names.map((recipeName) =>

            <li key={recipeName.Name.toString()}className="row" item={recipeName.Name}>
                <Col xs="12" md="6">{recipeName.Name}</Col>
                <Col xs="12" md="6">
                    <Button size="sm" onClick={() => (this.props.addclick(recipeName.Id))}>Add to grocery list</Button>
                    <Button size="sm" onClick={() => this.props.viewclick(recipeName.Id)}>View recipe</Button>
                </Col>
            </li>
        );
        return (
            <div>
                <Card className="card-modified">
                    <CardHeader>Recipe List</CardHeader>
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