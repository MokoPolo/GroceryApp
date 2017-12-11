import {
  SELECT_RECIPE,
  ADD_RECIPE_INGREDIENTS_TO_GROCERYLIST,
  GET_RECIPE_LIST
} from './ActionTypes';
import appConfig from '../settings.json';

/*export const selectRecipe = id => {
   return {
    type: SELECT_RECIPE,
    Recipe: {
      "Id": 5,
      "Name": "Spaghetti (test)",
      "Ingredients": [
          {
              "Id": 3,
              "Name": "Tomato sauce",
              "Done": false,
              "Category": null,
              "Reoccurring": false,
              "Quantity": 0
          },
          {
              "Id": 4,
              "Name": "Pasta",
              "Done": false,
              "Category": null,
              "Reoccurring": false,
              "Quantity": 0
          }
      ]
    
    }
  }
} */
export const changeboo = () => {
  return {
    type: 'change_bool',
    asdf: 'asdf'
  }
}
export const getRecipeList = id => {
  const settings = appConfig;
  return (dispatch) => {
    fetch(`${settings.RestServerLocation}/Api/recipe`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(result => result.json())
      .then((data) => {
        dispatch( {
          type: GET_RECIPE_LIST,
          RecipeList: data
        })
      });
  }
}
export const selectRecipe = id => {
  const settings = appConfig;
  return (dispatch) => {
     fetch(`${settings.RestServerLocation}/Api/recipe/${id}`)
      .then(result => result.json())
      .then((data) => {
        /* return {
          type: SELECT_RECIPE,
          Recipe: data
        } */
        dispatch( {
          type: SELECT_RECIPE,
          Recipe: data
        })
      }); 
  }
}
export const foofoo = id => {
  return {
    type: ADD_RECIPE_INGREDIENTS_TO_GROCERYLIST,
    id
  }
}
    /*const settings = appConfig;

     fetch(`${settings.RestServerLocation}/Api/recipe/${id}`)
      .then(result => result.json())
      .then((data) => {
        this.setState({ Recipe: data });
      }); */

/* Recipe: {
  "Id": 5,
  "Name": "Spaghetti (test)",
  "Ingredients": [
      {
          "Id": 3,
          "Name": "Tomato sauce",
          "Done": false,
          "Category": null,
          "Reoccurring": false,
          "Quantity": 0
      },
      {
          "Id": 4,
          "Name": "Pasta",
          "Done": false,
          "Category": null,
          "Reoccurring": false,
          "Quantity": 0
      }
  ]

} */
export const addRecipeIngredientsToGroceryList = id => {
  return {
    type: ADD_RECIPE_INGREDIENTS_TO_GROCERYLIST,
    id
  }
}