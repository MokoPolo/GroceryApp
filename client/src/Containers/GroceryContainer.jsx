import { connect } from 'react-redux';
//import RecipeList from '../Components/RecipeList';
import Grocery from '../Components/Grocery';
import {
    getReoccurringGroceryListItems,
    addReoccurringItemToGroceryList,
    getGroceryList,
} from '../Actions/ActionCreators';

const mapStateToProps = (state) => {
    return{
        RecipeList: state.recipeReducer.RecipeList,
        Ingredients: state.groceryReducer.groceryList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getReoccurringGroceryListItems: () => {
        dispatch(getReoccurringGroceryListItems());
    },
    addReoccurringItemToGroceryList: (id) => {
        dispatch(addReoccurringItemToGroceryList(id));
    },
    getGroceryList: () => {
        dispatch(getGroceryList());
    },
})

const GroceryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Grocery);

export default GroceryContainer;