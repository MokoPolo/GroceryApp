import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, ListGroupItemText } from 'reactstrap';

class GroceryItem extends Component {
    constructor() {
        super();
        this.state = {
            ingredient: null,
        };
    }

    toggle() {
        let newIngredient = {...this.state.ingredient};
        newIngredient.Done = !this.state.ingredient.Done;
        this.setState({ingredient:newIngredient});
        let booboo = {
            ingredient: {...this.state.ingredient},Done:!this.state.ingredient.Done
        }

/*         this.setState((previousState) => {
            return {
                ingredient: {...this.prevstate.ingredient},Done:!this.prevstate.ingredient.Done
            }
        }); */
/*         this.setState((previousState) => {
            return {
                ingredient: {
                    ingredient: {...this.state.ingredient},Done:!this.state.ingredient.Done
                }
            }
        }); */

        this.props.toggleItemClick(this.state.ingredient.Id, newIngredient.Done)
    }
    componentDidMount() {
        this.setState({ ingredient: this.props.ingredient });
    }
    render() {
        let strikeclassname;

        if (!this.state.ingredient) {
            return <div>Loading...</div>;
        }

        if (this.state.ingredient.Done === true) {
            if (this.props.showDone === true)
            {
            strikeclassname = "strike";
            }
            else
            {
                return null;
            }
        }
        else {
            strikeclassname = "nostrike";
        }
        const itemClass = "TransparentBackground NoBorders " + strikeclassname;

        return (
            <ListGroupItemText key={this.state.ingredient.Id} className={itemClass}>
                <Input type="checkbox" defaultChecked={this.state.ingredient.Done} onChange={this.toggle.bind(this)} /> {this.state.ingredient.Name}
            </ListGroupItemText>)
    }
}

GroceryItem.propTypes = {
    ingredient: PropTypes.object,
    toggleItemClick: PropTypes.func,
    showDone: PropTypes.bool
};

export default GroceryItem;