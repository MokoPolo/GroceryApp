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
                    ingredients: [],
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
        const settings = appConfig;
        /*         fetch(`${settings.RestServerLocation}/Api/ingredient?reoccurringItems=True`)
                  .then(result => result.json())
                  .then((data) => {
                    this.setState({ ingredients: data });
                  }); */
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Grocery Item</ModalHeader>
                    <ModalBody>
                        
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
};
GroceryItemEditModal.defaultProps = {
    modal: false,
};
export default GroceryItemEditModal;