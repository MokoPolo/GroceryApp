import { combineReducers } from 'redux';
import recipeReducer from './RecipeReducer';
import groceryReducer from './GroceryReducer';

const combineReducer = combineReducers({
    recipeReducer,
    groceryReducer,
})

export default combineReducer;