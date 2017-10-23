import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GroceryItems from './GroceryItems';

class GroceryContainer extends Component {
    constructor() {
        super();
        this.state = { Ingredients: [] };
    }
    componentDidMount() {
        fetch("http://localhost:64755/Api/grocery") 
            .then(result=> {
                return result.json();
            })
            .then(data =>
                this.setState({ Ingredients: data.Ingredients })
            )
            .catch(e => {
                console.log(e)
                return e;
            });
    }

    render() {
        return (    
        <div>
            <h2>Grocery List</h2>
            <GroceryItems ingredients={this.state.Ingredients}/>
        </div>);
    }
}

GroceryContainer.propTypes = {
    groceryList: PropTypes.object,
};

export default GroceryContainer;