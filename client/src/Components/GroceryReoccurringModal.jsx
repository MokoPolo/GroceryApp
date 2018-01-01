import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import appConfig from '../settings.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import {
  getReoccurringGroceryListItems,
} from '../Actions/ActionCreators';
import ReoccurringListItem from './ReoccurringListItem';

class GroceryReoccurringModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({ modal: !prevState.modal }), () => {
      if (this.state.modal === false) {
        // console.log("toggle callback");
        this.props.closeClick();
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ modal: nextProps.modal });
  }
  componentDidMount() {
    this.props.getReoccurringGroceryListItems();
  }
  render() {
    const listItems = this.props.ingredients.map(ingredient =>
      <ReoccurringListItem Name={ingredient.Name} Id={ingredient.Id} key={ingredient.Id} isAddingIngredientToGroceryList={ingredient.isAddingIngredientToGroceryList} />);
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Reoccurring Items</ModalHeader>
          <ModalBody>
            {listItems}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
            {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

GroceryReoccurringModal.propTypes = {
  modal: PropTypes.bool,
  closeClick: PropTypes.func,
};
GroceryReoccurringModal.defaultProps = {
  modal: false,
  ingredients: []
};

const mapStateToProps = (state) => {
  return{
    ingredients: state.groceryReducer.ReoccurringIngredients,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getReoccurringGroceryListItems: () => {
      dispatch(getReoccurringGroceryListItems());
  },
/*   addReoccurringItemToGroceryList: (id) => {
      dispatch(addReoccurringItemToGroceryList(id));
  },
  requestAddReoccurringItemToGroceryList: (id) => {
    dispatch(requestAddReoccurringItemToGroceryList(id));
  }, */
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(GroceryReoccurringModal);
