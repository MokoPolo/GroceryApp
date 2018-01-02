import {
  SELECT_RECIPE,
  ADD_RECIPE_TO_GROCERYLIST,
  GET_RECIPE_LIST,
  GET_REOCCURRING_GROCERY_LIST_ITEMS,
  ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
  REQUEST_ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
  REFRESH_GROCERY_LIST,
  GET_GROCERY_LIST,
  REQUEST_ADD_RECIPE_TO_GROCERYLIST
} from './ActionTypes';
import appConfig from '../settings.json';

export const refreshGroceryList = (refreshStatus) => {
  return {
    type: REFRESH_GROCERY_LIST,
    refreshGroceryList: refreshStatus
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
        dispatch({
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
        dispatch({
          type: SELECT_RECIPE,
          Recipe: data
        })
      });
  }
}
export const requestAddReoccurringItemToGroceryList = (id) => {
  return {
    type: REQUEST_ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
    id
  }
}
export const requestAddRecipeToGroceryList = (id) => {
  return {
    type: REQUEST_ADD_RECIPE_TO_GROCERYLIST,
    id
  }
}
export const getReoccurringGroceryListItems = () => {
  const settings = appConfig;
  return (dispatch) => {
    fetch(`${settings.RestServerLocation}/Api/ingredient?reoccurringItems=True`)
      .then(result => result.json())
      .then((data) => {
        dispatch({
          type: GET_REOCCURRING_GROCERY_LIST_ITEMS,
          ReoccurringIngredients: data
        })
      });
  }
}
export const addReoccurringItemToGroceryList = (id) => {
  const settings = appConfig;
  // Post to service. Add recipe ingredients to grocery list
  return (dispatch) => {
    fetch(`${settings.RestServerLocation}/Api/grocery/`, {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify({
        Id: id,
        Name: '',
        Done: false,
      }),
    }).then((result) => {
      dispatch({
        type: ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
        id
      })
    }).catch((err) => {
      console.log(err);
    });
  }
}

export const addRecipeToGroceryList = id => {
  const settings = appConfig;
  return (dispatch) => {
    dispatch({
      type: REQUEST_ADD_RECIPE_TO_GROCERYLIST,
      id: id,
      status: true
    });
    fetch(`${settings.RestServerLocation}/Api/grocery/${id}`, {
      method: 'POST',
    }).then((result) => {
      dispatch({
        type: ADD_RECIPE_TO_GROCERYLIST,
        id
      })
    });
  }
}
export const getGroceryList = id => {
  const settings = appConfig;
  return (dispatch) => {
    fetch(`${settings.RestServerLocation}/Api/grocery`)
      .then(result => result.json())
      .then((data) => {
        dispatch({
          type: GET_GROCERY_LIST,
          groceryList: data.Ingredients
        })
      });
  }
}
