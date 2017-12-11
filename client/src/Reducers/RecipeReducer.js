import { 
    SELECT_RECIPE,
    ADD_RECIPE_INGREDIENTS_TO_GROCERYLIST,
    GET_RECIPE_LIST
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
        case ADD_RECIPE_INGREDIENTS_TO_GROCERYLIST: 
            return {...state};
        case GET_RECIPE_LIST:
            return {
                ...state, RecipeList: action.RecipeList
            }
        case 'change_bool':
            return {
                ...state, tempboo: true
            }
        default:
            return state;
    }
}

export default recipeReducer;