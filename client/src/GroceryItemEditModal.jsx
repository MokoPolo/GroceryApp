import React, { Component } from 'react';
import PropTypes from 'prop-types';
import appConfig from './settings.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';

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
        console.log(`${settings.RestServerLocation}/api/grocery/${this.state.ingredient.Id}/${quanity}`);
        fetch(`${settings.RestServerLocation}/api/grocery/${this.state.ingredient.Id}/${quanity}`, {
            method: 'PUT',
            /*           headers: {
                        Accept: 'application/JSON',
                        'Content-Type': 'application/JSON',
                      }, */
        }).then((response) => {
            this.refreshData(this.state.ingredient.Id)
        });


    }
    removeItem() {
        const settings = appConfig;
        const quanity = this.state.ingredient.Quantity - 1;
        console.log(`${settings.RestServerLocation}/api/grocery/${this.state.ingredient.Id}/${quanity}`);
        fetch(`${settings.RestServerLocation}/api/grocery/${this.state.ingredient.Id}/${quanity}`, {
            method: 'PUT',
            /*           headers: {
                        Accept: 'application/JSON',
                        'Content-Type': 'application/JSON',
                      }, */
        }).then((response) => {
            this.refreshData(this.state.ingredient.Id)
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ modal: nextProps.modal });
        this.setState({ id: nextProps.id });
        this.refreshData(nextProps.id);
    }
    componentDidMount() {
        const settings = appConfig;
        console.log('id: ' + this.props.id);
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
            return <div></div>;
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