import React, {Component, PropTypes} from 'react';

import GroceryItems from './GroceryItems';

class GroceryContainer extends Component {
    render() {
        debugger;
        return (    
        <div>
            <GroceryItems ingredients={this.props.groceryList.Ingredients}/>
        </div>);
    }
}

GroceryContainer.propTypes = {
    groceryList: React.PropTypes.array,
};

export default GroceryContainer;