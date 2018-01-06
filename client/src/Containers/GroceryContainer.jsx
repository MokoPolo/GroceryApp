import { connect } from 'react-redux';
//import RecipeList from '../Components/RecipeList';
import Grocery from '../Components/Grocery';
import {
    getReoccurringGroceryListItems,
    addReoccurringItemToGroceryList,
    getGroceryList,
    refreshGroceryList,
    clearGroceryList,
    toggleEditItemVisibility,
    loadEditItem,
} from '../Actions/ActionCreators';

const mapStateToProps = (state) => {
    return {
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
    },
    toggleEditItemModalVisibility: (status) => {
        dispatch(toggleEditItemVisibility(status));
    },
    loadEditItem: (id) => {
        dispatch(loadEditItem(id));
    },

})

const GroceryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Grocery);

export default GroceryContainer;