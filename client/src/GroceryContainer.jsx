import React, { Component } from 'react';
import { Card, CardBody, CardText, CardHeader, Row, Col, Button } from 'reactstrap';
import './App.css';
import appConfig from './settings.json';
import GroceryAddItem from './GroceryAddItem';
import GroceryReoccurringModal from './GroceryReoccurringModal';
import GroceryItems from './GroceryItems';

class GroceryContainer extends Component {
  constructor() {
    super();
    this.state = {
      Ingredients: [],
      showDone: true,
      modal: false,
    };
    this.toggleViewItemsClickHandler = this.toggleViewItemsClickHandler.bind(this);
    this.refreshListClickHandler = this.refreshListClickHandler.bind(this);
    this.groceryAddItemClickHandler = this.groceryAddItemClickHandler.bind(this);
    this.groceryReoccurringModalHandler = this.groceryReoccurringModalHandler.bind(this);
    this.clearListHandler = this.clearListHandler.bind(this);
    this.closeClickHandler = this.closeClickHandler.bind(this);
  }

  componentWillReceiveProps() {
    this.refreshList();
  }

  toggleViewItemsClickHandler() {
    this.setState({ showDone: !this.state.showDone });
  }
  groceryAddItemClickHandler(name) {
      this.refreshList();
  }
  groceryReoccurringModalHandler() {
    this.setState({ modal: true });
  }
  clearListHandler() {
    const settings = appConfig;
    const id = 9999;
    fetch(`${settings.RestServerLocation}/Api/grocery/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
    }).then(() => {
      this.refreshList();
    });
  }
  closeClickHandler() {
    this.setState({ modal: false });
  }
  refreshListClickHandler() {
    this.refreshList();
  }
  checkBoxButtonClickHandler(index) {
    this.setState({ selectedItem: index });
  }
  refreshList() {
    const settings = appConfig;

    fetch(`${settings.RestServerLocation}/Api/grocery`)
            .then(result => result.json())
            .then((data) => {
              const arr = data.Ingredients;
              this.setState({ Ingredients: arr });
            });
  }
  render() {
    if (this.state.Ingredients === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Card className="card-modified">
          <CardHeader>Grocery List
            <Button onClick={this.toggleViewItemsClickHandler}>
                            View All
            </Button>
            <Button onClick={this.refreshListClickHandler}>Refresh</Button>
          </CardHeader>
          <CardBody>
            <CardText>
              <Row>
                <GroceryAddItem addItemClick={this.groceryAddItemClickHandler} />
              </Row>
              <Row>
                <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category === 'Meat')} title="Meat/Chicken" />
                </Col>
                <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category === 'Fresh Produce')} title="Fruits/Vegetables" />
                </Col>
                <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category !== 'Meat' && i.Category !== 'Fresh Produce')} title="Other" />
                </Col>
              </Row>
              <Row>
                <Col md="6" xs="6" />
                <Col md="6" xs="6" className="float-right">
                  <Button onClick={this.groceryReoccurringModalHandler}>
                                        Add reoccurring items
                  </Button>
                  <Button onClick={this.clearListHandler}>
                                        Clear list
                  </Button>
                </Col>
              </Row>
            </CardText>
          </CardBody>
        </Card>
        <GroceryReoccurringModal
          modal={this.state.modal}
          closeClick={this.closeClickHandler}
        />
      </div >);
  }
}

export default GroceryContainer;
