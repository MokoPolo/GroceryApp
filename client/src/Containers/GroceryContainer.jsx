import { connect } from 'react-redux';
//import RecipeList from '../Components/RecipeList';
import Grocery from '../Components/Grocery';
import {
    getReoccurringGroceryListItems,
    addReoccurringItemToGroceryList,
} from '../Actions/ActionCreators';

const mapStateToProps = (state) => {
    return{
        RecipeList: state.recipeReducer.RecipeList,
        tempboo: state.recipeReducer.tempboo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getReoccurringGroceryListItems: () => {
        dispatch(getReoccurringGroceryListItems());
    },
    addReoccurringItemToGroceryList: (id) => {
        dispatch(addReoccurringItemToGroceryList(id));
    },
})

const GroceryContainer = connect(
    mapStateToProps,
    //mapDispatchToProps
    )(Grocery);

export default GroceryContainer;