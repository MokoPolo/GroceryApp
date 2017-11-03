import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroceryItems from './GroceryItems';
import { Card, CardBody, CardText, CardHeader, Row, Col, Button } from 'reactstrap';
import './App.css';
import appConfig from './settings.json';
import GroceryAddItem from './GroceryAddItem';

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
    groceryItemClickHandler = (id, isDone) => {
        console.log("in groceryclickhandler");


        /*         fetch(settings.RestServerLocation + "/Api/grocery", {
                    method: "POST",
                    headers: {
                      "Accept": 'application/JSON',
                      "Content-Type": "application/JSON"
                    },
                    body: JSON.stringify(
                      id
                    ) */


        const settings = appConfig;
        fetch(settings.RestServerLocation + "/Api/grocery/" + id, {
            method: "PUT",
            headers: {
                "Accept": 'application/JSON',
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify(
                isDone
            )
        }).catch(err => {
            console.log(err);
        });
    }
    clearListHandler = () => {
        console.log("in clearListHandler");


        /*         fetch(settings.RestServerLocation + "/Api/grocery", {
                    method: "POST",
                    headers: {
                      "Accept": 'application/JSON',
                      "Content-Type": "application/JSON"
                    },
                    body: JSON.stringify(
                      id
                    ) */


        const settings = appConfig;
        const id = 9999;
        fetch(settings.RestServerLocation + "/Api/grocery/" + id, {
            method: "DELETE",
            headers: {
                "Accept": 'application/JSON',
                "Content-Type": "application/JSON"
            }
        }).then(() => {
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
        })
            .catch(err => {
                console.log(err);
            });
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
                                <GroceryAddItem />
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <GroceryItems ingredients={this.state.Ingredients} toggleItemClick={() => this.groceryItemClickHandler} title="Meat/Chicken" />
                                </Col>
                                <Col sm="4">
                                    <GroceryItems ingredients={this.state.Ingredients} toggleItemClick={() => this.groceryItemClickHandler} title="Fruits/Vegetables"/>
                                </Col>
                                <Col sm="4">
                                    <GroceryItems ingredients={this.state.Ingredients} toggleItemClick={() => this.groceryItemClickHandler} title="Other"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                </Col>
                                <Col sm="6" className="float-right">
                                    <Button>Add reoccurring items</Button>
                                    <Button onClick={this.clearListHandler.bind(this)}>Clear list</Button>
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