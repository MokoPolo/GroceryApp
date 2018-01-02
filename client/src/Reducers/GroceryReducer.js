import {
    GET_REOCCURRING_GROCERY_LIST_ITEMS,
    ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
    REQUEST_ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
    REFRESH_GROCERY_LIST,
    GET_GROCERY_LIST,
} from '../Actions/ActionTypes';
let defaultState = {
    ReoccurringIngredients: [],
    isAddingIngredientToGroceryList: false,
    groceryList: []
};

const groceryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_REOCCURRING_GROCERY_LIST_ITEMS:
            return {
                ...state, ReoccurringIngredients: action.ReoccurringIngredients.map(ingredient =>
                    ({...ingredient, isAddingIngredientToGroceryList: false})
                )
            };
        case ADD_REOCCURRING_ITEM_TO_GROCERYLIST:
            return {
                ...state, ReoccurringIngredients: state.ReoccurringIngredients.map(ingredient =>
                    (ingredient.Id === action.id)
                        ? { ...ingredient, isAddingIngredientToGroceryList: false }
                        : ingredient
                )
            };
        case REQUEST_ADD_REOCCURRING_ITEM_TO_GROCERYLIST:
            return {
                ...state, ReoccurringIngredients: state.ReoccurringIngredients.map(ingredient =>
                    (ingredient.Id === action.id)
                        ? { ...ingredient, isAddingIngredientToGroceryList: true }
                        : ingredient
                )
            }
        case REFRESH_GROCERY_LIST:
            return {
                ...state, refreshGroceryList: action.refreshGroceryList
            }
        case GET_GROCERY_LIST:
            return {
                ...state, groceryList: action.groceryList
            }
        default:
            return state;
    }
}

export default groceryReducer;