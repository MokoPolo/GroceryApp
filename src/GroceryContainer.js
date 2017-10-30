import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroceryItems from './GroceryItems';
import { Card, CardBody, CardText, CardHeader, Row, Col, Button } from 'reactstrap';
import './App.css';
import appConfig from './settings.json';

class GroceryContainer extends Component {
    constructor() {
        super();
        this.state = {
            Ingredients: []
        };

        
    }
    componentWillReceiveProps() {
        const settings = appConfig;
        
        fetch(settings.RestServerLocation + "/Api/grocery")
            .then(result => {
                return result.json();
            })
            .then(data => {
                const arr = data.Ingredients;
                this.setState({ Ingredients: arr })
            }
            ).catch(err => {
                console.log(err);
            });
    }
    groceryItemClickHandler = (id) => {
        console.log("in groceryclickhandler");
    }
    render() {
        if (this.state.Ingredients === 0) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Card className="card-modified">
                    <CardHeader >Grocery List</CardHeader>
                    <CardBody>
                        <CardText>
                            <Row>
                                <Col sm="12">
                                    <GroceryItems ingredients={this.state.Ingredients} toggleItemClick={() => this.groceryItemClickHandler} />
                                </Col>

                            </Row>
                            <Row>
                                <Col sm="7">
                                </Col>
                                <Col sm="4" className="float-right">
                                    <Button>Add reoccurring items</Button>
                                    <Button>Clear list</Button>
                                </Col>
                            </Row>
                        </CardText>
                    </CardBody>
                </Card>

            </div >);
    }
}

GroceryContainer.propTypes = {
    groceryList: PropTypes.array,
};
GroceryContainer.defaultProps = {
    Ingredients: []
};

export default GroceryContainer;