import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GroceryItems from './GroceryItems';

class GroceryContainer extends Component {
    render() {
        return (    
        <div>
            <h2>Grocery List</h2>
            <GroceryItems ingredients={this.props.groceryList.Ingredients}/>
        </div>);
    }
}

GroceryContainer.propTypes = {
    groceryList: PropTypes.object,
};

export default GroceryContainer;