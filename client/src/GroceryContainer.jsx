import React, { Component } from 'react';
import { Card, CardBody, CardText, CardHeader, Row, Col, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import './App.css';
import appConfig from './settings.json';
import GroceryAddItem from './GroceryAddItem';
import GroceryReoccurringModal from './GroceryReoccurringModal';
import GroceryItems from './GroceryItems';
import GroceryEditItemModal from './GroceryItemEditModal';

class GroceryContainer extends Component {
  constructor() {
    super();
    this.state = {
      Ingredients: [],
      showDone: true,
      modalReoccurring: false,
      modalEdit: false,
      clearing: false,
      refreshing: false,
    };
    this.toggleViewItemsClickHandler = this.toggleViewItemsClickHandler.bind(this);
    this.refreshListClickHandler = this.refreshListClickHandler.bind(this);
    this.groceryAddItemClickHandler = this.groceryAddItemClickHandler.bind(this);
    this.groceryReoccurringModalHandler = this.groceryReoccurringModalHandler.bind(this);
    this.clearListHandler = this.clearListHandler.bind(this);
    this.closeClickHandler = this.closeClickHandler.bind(this);
    this.closeModalEditClickHandler = this.closeModalEditClickHandler.bind(this);
    this.groceryEditItemModalHandler = this.groceryEditItemModalHandler.bind(this);
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
    this.setState({ modalReoccurring: true });
  }
  groceryEditItemModalHandler(selectedId) {
    console.log('in groceryEditItemModalHandler ' + selectedId);
    this.setState({ selectedGroceryItemId: selectedId });
    this.setState({ modalEdit: true });
  }
  clearListHandler() {
    const settings = appConfig;
    const id = 9999;
    this.setState({ clearing: true });
    fetch(`${settings.RestServerLocation}/Api/grocery/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
    }).then(() => {
      this.setState({ clearing: false });
      this.refreshList();
    });
  }
  closeClickHandler() {
    this.setState({ modalReoccurring: false });
  }
  closeModalEditClickHandler() {
    this.setState({ modalEdit: false });
  }
  refreshListClickHandler() {
    this.refreshList();
  }
  checkBoxButtonClickHandler(index) {
    this.setState({ selectedItem: index });
  }
  refreshList() {
    const settings = appConfig;
    this.setState({ refreshing: true });
    fetch(`${settings.RestServerLocation}/Api/grocery`)
      .then(result => result.json())
      .then((data) => {
        const arr = data.Ingredients;
        this.setState({ Ingredients: arr });
        this.setState({ refreshing: false });
      });
  }
  render() {
    if (this.state.Ingredients === 0) {
      return <div>Loading...</div>;
    }
    let spinnerClearList = '';
    let spinnerRefreshList = '';
    if (this.state.clearing)
    {
      spinnerClearList = <FontAwesome name='spinner' spin />;
    }
    if (this.state.refreshing)
    {
      spinnerRefreshList = <FontAwesome name='spinner' spin />;
    }
    return (
      <div>
        <Card className="card-modified">
          <CardHeader>Grocery List
            <Button onClick={this.toggleViewItemsClickHandler}>
              View All
            </Button>
            <Button onClick={this.refreshListClickHandler}>Refresh</Button> { spinnerRefreshList }
          </CardHeader>
          <CardBody>
            <CardText>
              <Row>
                <Col md="4" xs="12" sm="12" lg="12">
                  <GroceryAddItem addItemClick={this.groceryAddItemClickHandler} />
                </Col>
              </Row>
              <Row>
                <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category === 'Meat')} editItemClick={this.groceryEditItemModalHandler} title="Meat/Chicken" />
                </Col>
                <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category === 'Fresh Produce')} editItemClick={this.groceryEditItemModalHandler} title="Fruits/Vegetables" />
                </Col>
                <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.state.Ingredients.filter(i => i.Category !== 'Meat' && i.Category !== 'Fresh Produce')} editItemClick={this.groceryEditItemModalHandler} title="Other" />
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
                  </Button> { spinnerClearList }
                </Col>
              </Row>
            </CardText>
          </CardBody>
        </Card>
        <GroceryReoccurringModal
          modal={this.state.modalReoccurring}
          closeClick={this.closeClickHandler}
        />
        <GroceryEditItemModal
          modal={this.state.modalEdit}
          closeClick={this.closeModalEditClickHandler}
          id={this.state.selectedGroceryItemId}
        />
      </div >);
  }
}

export default GroceryContainer;
