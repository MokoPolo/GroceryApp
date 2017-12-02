import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import appConfig from './settings.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class GroceryItemEditModal extends Component {
  constructor(props) {
    super(props);
        /*         this.state = {
                  modal: false,
                  ingredients: [],
                }; */
    this.state = {
      modal: false,
      ingredient: null,
      id: -1,
      modifying: false,
    };
    this.toggle = this.toggle.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  toggle() {
    this.setState(prevState => ({ modal: !prevState.modal }), () => {
      if (this.state.modal === false) {
                // console.log("toggle callback");
        this.props.closeClick();
      }
    });
  }
  addItem() {
    const settings = appConfig;
    const quanity = this.state.ingredient.Quantity + 1;
    this.setState({ modifying: true });
    fetch(`${settings.RestServerLocation}/api/grocery/${this.state.ingredient.Id}/${quanity}`, {
      method: 'PUT',
            /*           headers: {
                        Accept: 'application/JSON',
                        'Content-Type': 'application/JSON',
                      }, */
    }).then((response) => {
      this.refreshData(this.state.ingredient.Id);
      this.setState({ modifying: false });
    });
  }
  removeItem() {
    const settings = appConfig;
    const quanity = this.state.ingredient.Quantity - 1;
    this.setState({ modifying: true });
    fetch(`${settings.RestServerLocation}/api/grocery/${this.state.ingredient.Id}/${quanity}`, {
      method: 'PUT',
            /*           headers: {
                        Accept: 'application/JSON',
                        'Content-Type': 'application/JSON',
                      }, */
        }).then((response) => {
            this.refreshData(this.state.ingredient.Id);
            this.setState({ modifying: false });
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ modal: nextProps.modal });
        this.setState({ id: nextProps.id });
        this.refreshData(nextProps.id);
    }
    componentDidMount() {
        this.refreshData(this.props.id);

    }
    refreshData(id) {
        const settings = appConfig;

    fetch(`${settings.RestServerLocation}/Api/grocery/ingredient/${id}`)
            .then(result => result.json())
            .then((data) => {
              this.setState({ ingredient: data });
            });
  }
  render() {
    if (!this.state.ingredient) {
      return <div />;
    }
    let spinner = '';
    if (this.state.modifying) {
      spinner = <FontAwesome name="spinner" spin />;
    }
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Grocery Item</ModalHeader>
          <ModalBody>
            <div>{this.state.ingredient.Name}</div>
            <Button color="primary" onClick={this.removeItem}>-
                        </Button>
            {this.state.ingredient.Quantity}
            <Button color="primary" onClick={this.addItem}>+
                        </Button>
            { spinner }
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

GroceryItemEditModal.propTypes = {
  modal: PropTypes.bool,
  closeClick: PropTypes.func,
  id: PropTypes.number,
};
GroceryItemEditModal.defaultProps = {
  modal: false,
  id: -1,
};
export default GroceryItemEditModal;
