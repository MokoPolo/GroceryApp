import {
    GET_REOCCURRING_GROCERY_LIST_ITEMS,
    ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
    REQUEST_ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
} from '../Actions/ActionTypes';
let defaultState = {
    ReoccurringIngredients: [],
    isAddingIngredientToGroceryList: false,
};

const groceryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_REOCCURRING_GROCERY_LIST_ITEMS:
            return {
                ...state, ReoccurringIngredients: action.ReoccurringIngredients.map(ingredient =>
                    (ingredient.Id === action.id)
                        ? { ...ingredient, isAddingIngredientToGroceryList: true }
                        : { ...ingredient, isAddingIngredientToGroceryList: false }
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
        default:
            return state;
    }
}

export default groceryReducer;