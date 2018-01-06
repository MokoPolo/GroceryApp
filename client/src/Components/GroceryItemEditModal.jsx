import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import appConfig from '../settings.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import {
  refreshEditItem,
  loadEditItem,
  setEditItemQuantity,
  toggleEditItemVisibility,
} from '../Actions/ActionCreators';

class GroceryItemEditModal extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.refreshEditItemData === true) {
      this.props.loadEditItem(this.props.selectedEditItem.Id);
    } 
  }
  componentDidMount() {
    if (this.props.selectedEditItem) {
      this.props.loadEditItem(this.props.selectedEditItem.Id);
    }
  }
  addItem() {
    const settings = appConfig;
    const quantity = this.props.selectedEditItem.Quantity + 1;

    this.props.setEditItemQuantity(this.props.selectedEditItem.Id, quantity);
  }
  removeItem() {
    const settings = appConfig;
    const quantity = this.props.selectedEditItem.Quantity - 1;

    this.props.setEditItemQuantity(this.props.selectedEditItem.Id, quantity);
  }
  toggle() {
    this.props.toggleEditItemVisibility(!this.props.showEditItem);
  }
  render() {
    if (!this.props.selectedEditItem) {
      return <div />;
    }
    let spinner = '';
    if (this.props.modifyingEditItem) {
      spinner = <FontAwesome name="spinner" spin />;
    }
    return (
      <div>
        <Modal isOpen={this.props.showEditItem} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Grocery Item</ModalHeader>
          <ModalBody>
            <div>{this.props.selectedEditItem.Name}</div>
            <Button color="primary" onClick={this.removeItem}>-
                              </Button>
            {this.props.selectedEditItem.Quantity}
            <Button color="primary" onClick={this.addItem}>+
                              </Button>
            {spinner}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );

  }

}
GroceryItemEditModal.propTypes = {
  modal: PropTypes.bool,
  closeClick: PropTypes.func,
};
GroceryItemEditModal.defaultProps = {
  modal: false,
};


const mapStateToProps = (state) => {
  return {
    refreshEditItemData: state.groceryReducer.refreshEditItem,
    selectedEditItem: state.groceryReducer.selectedEditItem,
    showEditItem: state.groceryReducer.showEditItem,
    modifyingEditItem: state.groceryReducer.modifyingEditItem
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
/*   refreshEditItem: () => {
    dispatch(refreshEditItem());
  }, */
  loadEditItem: (id) => {
    dispatch(loadEditItem(id));
  },
  setEditItemQuantity: (id, qty) => {
    dispatch(setEditItemQuantity(id, qty));
  },
  toggleEditItemVisibility: (status) => {
    dispatch(toggleEditItemVisibility(status));
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroceryItemEditModal);


