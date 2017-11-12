import React, { Component } from 'react';
import PropTypes from 'prop-types';
import appConfig from './settings.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';

class GroceryReoccurringModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            ingredients: []
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => {
            return { modal: !prevState.modal }
        }, () => {
            if (this.state.modal === false) {
                //console.log("toggle callback");
                this.props.closeClick();
            }
        }
        );
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ modal: nextProps.modal });
    }
    componentWillMount() {
//this.setState({ modal: this.props.modal });
    }
    componentDidUpdate() {
        //console.log("componentDidUpdate");
    }
    componentDidMount() {
        const settings = appConfig;
        fetch(settings.RestServerLocation + "/Api/ingredient?reoccurringItems=True")
            .then(result => result.json())
            .then((data) => {
                this.setState({ ingredients: data });
            });
    }
    render() {
        const listItems = this.state.ingredients.map((ingredient) =>
            <ReoccurringListItem Name={ingredient.Name} Id={ingredient.Id} key={ingredient.Id} />
        );
        return (
            <div>
                {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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
        )
    }
}

class ReoccurringListItem extends Component {
    constructor() {
        super();
        this.state = { LoadingMessage: "" };
        this.recipeListAddClickHandler.bind(this);
    }

    recipeListAddClickHandler(id) {
        const settings = appConfig;
        this.setState({ LoadingMessage: "loading..." });
        // Post to service. Add recipe ingredients to grocery list
        const ingredient = {
            "Id": id,
            "Name": "Foo",
            "Done": false
        };
        fetch(settings.RestServerLocation + "/Api/grocery/", {
            method: "POST",
            headers: {
                "Accept": 'application/JSON',
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify(
                {
                    "Id": id,
                    "Name": "",
                    "Done": false
                }
            )
        }).then(result => {
            this.setState({ LoadingMessage: "Complete" });
            //this.props.addclick(id);
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <li key={this.props.Name.toString()} className="row" item={this.props.Name}>
                <Col xs="12" md="6">{this.props.Name}</Col>
                <Col xs="12" md="6">
                    <Button size="sm" onClick={() => this.recipeListAddClickHandler(this.props.Id)}>Add to grocery list</Button>
                    {this.state.LoadingMessage}
                </Col>
            </li>);
    }
}
GroceryReoccurringModal.propTypes = {
    modal: PropTypes.bool,
    closeClick: PropTypes.func
};
GroceryReoccurringModal.defaultProps = {
    modal: false
};
export default GroceryReoccurringModal;