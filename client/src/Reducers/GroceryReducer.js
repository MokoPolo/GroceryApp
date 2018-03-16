import {
    GET_REOCCURRING_GROCERY_LIST_ITEMS,
    ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
    REQUEST_ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
    REFRESH_GROCERY_LIST,
    GET_GROCERY_LIST,
    CLEAR_GROCERY_LIST,
    EDIT_ITEM_REFRESH,
    EDIT_ITEM_LOAD,
    EDIT_ITEM_SET_QUANTITY,
    EDIT_ITEM_TOGGLE_VISIBILITY,
    REQUEST_MODIFYING_EDIT_ITEM,
    EDIT_ITEM_SET_CATEGORY,
    GET_GROCERY_RELATED_RECIPE_LIST,
    REFRESH_GROCERY_RECIPE_DESCRIPTION_DATA,
} from '../Actions/ActionTypes';
let defaultState = {
    ReoccurringIngredients: [],
    RecipeDescriptionList: [],
    isAddingIngredientToGroceryList: false,
    groceryList: [],
    refreshGroceryList: false,
    refreshEditItem: false,
    selectedEditItem: null,
    showEditItem: false,
    modifyingEditItem: false
};

const groceryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_REOCCURRING_GROCERY_LIST_ITEMS:
            return {
                ...state, ReoccurringIngredients: action.ReoccurringIngredients.map(ingredient =>
                    ({ ...ingredient, isAddingIngredientToGroceryList: false })
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
        case CLEAR_GROCERY_LIST:
            return {
                ...state
            }
        case EDIT_ITEM_REFRESH:
        return {
            ...state, refreshEditItem: action.refreshEditItem
        }
        case EDIT_ITEM_LOAD:
        return {
            ...state, selectedEditItem: action.selectedEditItem
        }
        case EDIT_ITEM_SET_QUANTITY:
        return {
            ...state, refreshEditItem: true,
        }
        case EDIT_ITEM_SET_CATEGORY:
        return {
            ...state, refreshEditItem: true,
        }
        case EDIT_ITEM_TOGGLE_VISIBILITY:
        return {
            ...state, showEditItem: action.showEditItem
        }
        case REQUEST_MODIFYING_EDIT_ITEM:
        return {
            ...state, modifyingEditItem: action.modifyingEditItem
        }
        case GET_GROCERY_RELATED_RECIPE_LIST:
        return {
            ...state, recipeDescriptionList: action.RecipeDescriptionList
        }
        case REFRESH_GROCERY_RECIPE_DESCRIPTION_DATA:
        return {
            ...state, refreshGroceryRecipeDescriptionList: action.refreshGroceryRecipeDescriptionList
        }
        default:
            return state;
    }
}

export default groceryReducer;