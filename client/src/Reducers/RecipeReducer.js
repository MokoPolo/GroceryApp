import { 
    SELECT_RECIPE,
    ADD_RECIPE_TO_GROCERYLIST,
    GET_RECIPE_LIST,
    REQUEST_ADD_RECIPE_TO_GROCERYLIST,
 } from '../Actions/ActionTypes';
let defaultState = {
    Recipe: null, 
    RecipeList: [], 
    tempboo: false
};

const recipeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SELECT_RECIPE:
            return {
                ...state, Recipe: action.Recipe
            }
        case ADD_RECIPE_TO_GROCERYLIST: 
            return {...state, RecipeList: state.RecipeList.map(recipe =>
                (recipe.Id === action.id)
                ? { ...recipe, isAddingToGroceryList: false }
                : recipe
            )
        };
        case GET_RECIPE_LIST:
            return {
                ...state, RecipeList: action.RecipeList.map(recipe =>
                        ({ ...recipe, isAddingToGroceryList: false })
                )
            }
        case REQUEST_ADD_RECIPE_TO_GROCERYLIST:
            return {
                ...state, RecipeList: state.RecipeList.map(recipe =>
                    (recipe.Id === action.id)
                        ? { ...recipe, isAddingToGroceryList: action.status }
                        : recipe
                )
            }
        default:
            return state;
    }
}

export default recipeReducer;