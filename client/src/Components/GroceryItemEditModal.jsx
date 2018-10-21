import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import appConfig from "../settings.json";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col
} from "reactstrap";
import {
  refreshEditItem,
  loadEditItem,
  setEditItemQuantity,
  toggleEditItemVisibility,
  setEditItemCategory
} from "../Actions/ActionCreators";

class GroceryItemEditModal extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleQuantityBlur = this.handleQuantityBlur.bind(this);
    this.handleCategoryBlur = this.handleCategoryBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshEditItemData === true) {
      this.props.loadEditItem(this.props.selectedEditItem.Id);
    }
    if (this.props.selectedEditItem !== null) {
      this.setState({ foo: this.props.selectedEditItem.Quantity });
    }
  }
  componentDidMount() {
    if (this.props.selectedEditItem) {
      this.props.loadEditItem(this.props.selectedEditItem.Id);
    }
    if (this.props.selectedEditItem !== null) {
      this.setState({ foo: this.props.selectedEditItem.Quantity });
    }
  }
  addItem() {
    const quantity = this.props.selectedEditItem.Quantity + 1;

    this.props.setEditItemQuantity(this.props.selectedEditItem.Id, quantity);
  }
  removeItem() {
    const quantity = this.props.selectedEditItem.Quantity - 1;

    this.props.setEditItemQuantity(this.props.selectedEditItem.Id, quantity);
  }
  handleQuantityChange(event) {
    const quantity = event.target.value;

    this.props.setEditItemQuantity(this.props.selectedEditItem.Id, quantity);
  }
  handleQuantityBlur(event) {
    const quantity = event.target.value;

    this.props.setEditItemQuantity(this.props.selectedEditItem.Id, quantity);
  }
  handleCategoryBlur(event) {
    const categoryId = event.target.value;

    this.props.setEditItemCategory(this.props.selectedEditItem.Id, categoryId);
  }
  toggle() {
    this.props.toggleEditItemVisibility(!this.props.showEditItem);
  }
  render() {
    if (!this.props.selectedEditItem) {
      return <div />;
    }
    let spinner = "";
    if (this.props.modifyingEditItem) {
      spinner = <FontAwesome name="spinner" spin />;
    }
    return (
      <div>
        <Modal
          isOpen={this.props.showEditItem}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Grocery Item</ModalHeader>
          <ModalBody>
            <div>{this.props.selectedEditItem.Name}</div>
            <Form>
              <FormGroup>
                <Label for="category">Select grocery category</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={this.props.selectedEditItem.CategoryId}
                  onChange={this.handleCategoryBlur}
                >
                  <option value="1">Fresh Produce</option>
                  <option value="2">Meat</option>
                  <option value="3">Dairy</option>
                  <option value="4">Bread, Cereal, Rice and Pasta</option>
                  <option value="5">Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input
                  type="select"
                  name="quantity"
                  id="quantity"
                  value={this.props.selectedEditItem.Quantity}
                  onChange={this.handleQuantityBlur}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Input>
              </FormGroup>
            </Form>

            {spinner}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
GroceryItemEditModal.propTypes = {
  modal: PropTypes.bool,
  closeClick: PropTypes.func
};
GroceryItemEditModal.defaultProps = {
  modal: false
};

const mapStateToProps = state => {
  return {
    refreshEditItemData: state.groceryReducer.refreshEditItem,
    selectedEditItem: state.groceryReducer.selectedEditItem,
    showEditItem: state.groceryReducer.showEditItem,
    modifyingEditItem: state.groceryReducer.modifyingEditItem
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  /*   refreshEditItem: () => {
      dispatch(refreshEditItem());
    }, */
  loadEditItem: id => {
    dispatch(loadEditItem(id));
  },
  setEditItemQuantity: (id, qty) => {
    dispatch(setEditItemQuantity(id, qty));
  },
  setEditItemCategory: (id, categoryId) => {
    dispatch(setEditItemCategory(id, categoryId));
  },
  toggleEditItemVisibility: status => {
    dispatch(toggleEditItemVisibility(status));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroceryItemEditModal);
