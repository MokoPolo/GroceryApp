import React, {Component, PropTypes} from 'react';

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
    groceryList: React.PropTypes.object,
};

export default GroceryContainer;