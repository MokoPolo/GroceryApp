import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroceryItems from './GroceryItems';
import { Card, CardBody, CardText, CardHeader, Row, Col, Button, ButtonGroup } from 'reactstrap';
import './App.css';
import appConfig from './settings.json';
import GroceryAddItem from './GroceryAddItem';

class GroceryContainer extends Component {
    constructor() {
        super();
        this.state = {
            Ingredients: [],
            showDone: true
        };


    }

    refreshList = () => {
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

    componentWillReceiveProps() {
         this.refreshList();
    }

    toggleViewItemsClickHandler = (id, isDone) => {
        console.log("in groceryclickhandler");

        this.setState({"showDone": !this.state.showDone});
    }
    groceryItemClickHandler = (id, isDone) => {
        console.log("in groceryclickhandler");

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
    groceryAddItemClickHandler = (name) => {
        console.log("in groceryAddItemClickHandler");

        const settings = appConfig;

        // Post to service. Add recipe ingredients to grocery list
        fetch(settings.RestServerLocation + "/Api/grocery", {
            method: "POST",
            headers: {
                "Accept": 'application/JSON',
                "Content-Type": "application/JSON"
            },
            body:
            JSON.stringify({
                "Name": name,
                "Id": -1,
                "Done": false

            })


        }).then(() => {
            this.refreshList();
        })
            .catch(err => {
                console.log(err);
            });
    }
    clearListHandler = () => {
        console.log("in clearListHandler");

        const settings = appConfig;
        const id = 9999;
        fetch(settings.RestServerLocation + "/Api/grocery/" + id, {
            method: "DELETE",
            headers: {
                "Accept": 'application/JSON',
                "Content-Type": "application/JSON"
            }
        }).then(() => {
            this.refreshList();
        })
            .catch(err => {
                console.log(err);
            });
    }
    refreshListClickHandler = () => {
        this.refreshList();
    }
    checkBoxButtonClickHandler = (index) => {
        console.log("checkBoxButtonClickHandler");
        this.setState({ "selectedItem": index });
    }
    render() {
        if (this.state.Ingredients === 0) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Card className="card-modified">
                    <CardHeader >Grocery List 
                        <Button onClick={() => this.toggleViewItemsClickHandler}>View All</Button>
                        <Button onClick={() => this.refreshListClickHandler}>Refresh</Button>
{/*                         <ButtonGroup>
                            <Button color="primary" onClick={() => this.checkBoxButtonClickHandler(1)} active={this.state.selectedItem === 1}>View Completed
                            </Button>
                            <Button color="primary" onClick={() => this.checkBoxButtonClickHandler(2)} active={this.state.selectedItem === 2}>Hide Completed
                            </Button>
                        </ButtonGroup> */}
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <Row>
                                <GroceryAddItem addItemClick={this.groceryAddItemClickHandler} />
                            </Row>
                            <Row>
                                <Col md="4" xs="12" sm="12">
                                    <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category === "Meat")} toggleItemClick={() => this.groceryItemClickHandler} title="Meat/Chicken" />
                                </Col>
                                <Col md="4" xs="12" sm="12">
                                    <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category === "Fresh Produce")} toggleItemClick={() => this.groceryItemClickHandler} title="Fruits/Vegetables" />
                                </Col>
                                <Col md="4" xs="12" sm="12">
                                    <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category !== "Meat" && i.Category !== "Fresh Produce")} toggleItemClick={() => this.groceryItemClickHandler} title="Other" />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6" xs="6">
                                </Col>
                                <Col md="6" xs="6" className="float-right">
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