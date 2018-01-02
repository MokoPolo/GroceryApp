import { connect } from 'react-redux';
//import RecipeList from '../Components/RecipeList';
import Grocery from '../Components/Grocery';
import {
    getReoccurringGroceryListItems,
    addReoccurringItemToGroceryList,
    getGroceryList,
    refreshGroceryList,
    clearGroceryList
} from '../Actions/ActionCreators';

const mapStateToProps = (state) => {
    return{
        RecipeList: state.recipeReducer.RecipeList,
        Ingredients: state.groceryReducer.groceryList,
        refreshGroceryListStatus: state.groceryReducer.refreshGroceryList
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
    refreshGroceryList: (status) => {
        dispatch(refreshGroceryList(status));
    },
    clearGroceryList: () => {
        dispatch(clearGroceryList());
    }
})

const GroceryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Grocery);

export default GroceryContainer;