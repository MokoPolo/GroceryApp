import React, { Component } from 'react';
import { Card, CardBody, CardText, CardHeader, Row, Col, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import '../App.css';
import appConfig from '../settings.json';
import GroceryAddItem from './GroceryAddItem';
import GroceryReoccurringModal from './GroceryReoccurringModal';
import GroceryItems from './GroceryItems';
import GroceryEditItemModal from './GroceryItemEditModal';

class Grocery extends Component {
  constructor() {
    super();
    this.state = {
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

  componentDidMount(){
    this.props.getGroceryList();
    let coo = this.props.getGroceryRelatedRecipeList(1);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshGroceryListStatus === true) {//&& (this.props.refreshGroceryListStatus !== nextProps.refreshGroceryListStatus)) {
      this.props.getGroceryList();
    }
    if (nextProps.refreshGroceryRecipeDescriptionList === true) {
      this.props.getGroceryRelatedRecipeList(1);
    }
    //this.props.getGroceryList();
  }

  toggleViewItemsClickHandler() {
    this.setState({ showDone: !this.state.showDone });
  }
  groceryAddItemClickHandler(name) {
    this.props.getGroceryList();
  }
  groceryReoccurringModalHandler() {
    this.setState({ modalReoccurring: true });
  }
  groceryEditItemModalHandler(selectedId) {
    console.log(`in groceryEditItemModalHandler ${selectedId}`);
    this.props.loadEditItem(selectedId);
    this.props.toggleEditItemModalVisibility(true);
  }
  clearListHandler() {
    //this.props.refreshGroceryList(true);
    this.props.clearGroceryList();//.then({
      // Need a promise here
    //}); 
    //this.props.getGroceryList();
  }
  closeClickHandler() {
    this.setState({ modalReoccurring: false });
  }
  closeModalEditClickHandler() {
    this.setState({ modalEdit: false });
  }
  refreshListClickHandler() {
    this.props.refreshGroceryList(true);
    this.props.getGroceryList();
  }
  checkBoxButtonClickHandler(index) {
    this.setState({ selectedItem: index });
  }
  refreshList() {
    this.props.getGroceryList();
/*     const settings = appConfig;
    this.setState({ refreshing: true });
    fetch(`${settings.RestServerLocation}/Api/grocery`)
      .then(result => result.json())
      .then((data) => {
        const arr = data.Ingredients;
        this.setState({ Ingredients: arr });
        this.setState({ refreshing: false });
      }); */
  }
  render() {
/*     if (this.props.Ingredients.length === 0) {
      return <div>Loading...</div>;
    } */
    let spinnerClearList = '';
    let spinnerRefreshList = '';
    if (this.state.clearing) {
      spinnerClearList = <FontAwesome name="spinner" spin />;
    }
    if (this.props.refreshGroceryListStatus) {
      //this.props.getGroceryList();
      spinnerRefreshList = <FontAwesome name="spinner" spin />;
    }

    let recipeDescriptions = '';
    if (this.props.GroceryRelatedRecipeList) {
      recipeDescriptions = this.props.GroceryRelatedRecipeList.map(i => <li>{i}</li>);
    }
    return (
      <div>
        <Card className="card-modified">
          <CardHeader>Grocery List
            <Button onClick={this.toggleViewItemsClickHandler}>
              Toggle View All
            </Button>
            <Button onClick={this.refreshListClickHandler}>Refresh</Button> { spinnerRefreshList }
            <div>Recipes on this weeks grocery list:
            <ul> { recipeDescriptions } </ul></div>
            
          </CardHeader>
          <CardBody>
            <CardText tag="div">
              <Row>
                <Col md="4" xs="12" sm="12" lg="12">
                  <GroceryAddItem addItemClick={this.groceryAddItemClickHandler} />
                </Col>
              </Row>
              <Row>
                 <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone}  ingredients={this.props.Ingredients.filter(i => i.Category === 'Meat')} editItemClick={this.groceryEditItemModalHandler} title="Meat/Chicken" />
                </Col> 
                <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.props.Ingredients.filter(i => i.Category === 'Fresh Produce')} editItemClick={this.groceryEditItemModalHandler} title="Fruits/Vegetables" />
                </Col>
                 <Col md="4" xs="12" sm="12">
                  <GroceryItems showDone={this.state.showDone} ingredients={this.props.Ingredients.filter(i => i.Category !== 'Meat' && i.Category !== 'Fresh Produce')} editItemClick={this.groceryEditItemModalHandler} title="Other" />
                </Col>
              </Row>
              <Row>
                <Col md="5" xs="5" />
                <Col md="6" xs="6" className="float-right">
                  <Button onClick={this.groceryReoccurringModalHandler}>
                    Add reoccurring items
                  </Button>
                   <Button onClick={this.clearListHandler}>
                    Clear list
                  </Button> { spinnerClearList }
                </Col>
                <Col md="1" xs="1" />
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
        />
      </div >);
  }
}

Grocery.defaultProps = {
  Ingredients: [],
};
export default Grocery;
