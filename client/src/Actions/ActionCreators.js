import {
  SELECT_RECIPE,
  ADD_RECIPE_TO_GROCERYLIST,
  GET_RECIPE_LIST,
  GET_REOCCURRING_GROCERY_LIST_ITEMS,
  ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
  REQUEST_ADD_REOCCURRING_ITEM_TO_GROCERYLIST,
  REFRESH_GROCERY_LIST,
  GET_GROCERY_LIST,
  REQUEST_ADD_RECIPE_TO_GROCERYLIST,
  CLEAR_GROCERY_LIST,
  TOGGLE_GROCERY_ITEM,
  EDIT_ITEM_REFRESH,
  EDIT_ITEM_SET_QUANTITY,
  EDIT_ITEM_TOGGLE_VISIBILITY,
  EDIT_ITEM_LOAD,
  REQUEST_MODIFYING_EDIT_ITEM
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
      });
      dispatch({
        type: REFRESH_GROCERY_LIST,
        refreshGroceryList: true
      });
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
      dispatch({
        type: REFRESH_GROCERY_LIST,
        refreshGroceryList: true
      });
    });
  }
}
export const getGroceryList = () => {
  const settings = appConfig;
  return (dispatch) => {
    fetch(`${settings.RestServerLocation}/Api/grocery`)
      .then(result => result.json())
      .then((data) => {
        dispatch({
          type: GET_GROCERY_LIST,
          groceryList: data.Ingredients
        })
        dispatch({
          type: REFRESH_GROCERY_LIST,
          refreshGroceryList: false
        });
      });
  }
}
export const clearGroceryList = () => {
  const settings = appConfig;
  return (dispatch) => {
    const settings = appConfig;
    const id = 9999;
    fetch(`${settings.RestServerLocation}/Api/grocery/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
    }).then(() => {
      dispatch({
        type: CLEAR_GROCERY_LIST,
      });
      dispatch({
        type: REFRESH_GROCERY_LIST,
        refreshGroceryList: true
      });
    });
  }
}
export const toggleGroceryItem = (id, isDone) => {
  const settings = appConfig;
  return (dispatch) => {
    const settings = appConfig;
    fetch(`${settings.RestServerLocation}/Api/grocery/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(isDone),
    }).then(() => {
      dispatch({
        type: TOGGLE_GROCERY_ITEM,
        id
      });
      dispatch({
        type: REFRESH_GROCERY_LIST,
        refreshGroceryList: true
      });
    });
  }
}
export const refreshEditItem = (refreshEditItem) => {
  const settings = appConfig;
  return (dispatch) => {
      dispatch({
        type: EDIT_ITEM_REFRESH,
        refreshEditItem
      });
      //EDIT_ITEM_REFRESH
      //this.setState({ selectedEditGroceryItem: data });
  }
}
export const loadEditItem = (id) => {
  const settings = appConfig;
  return (dispatch) => {
    fetch(`${settings.RestServerLocation}/Api/grocery/ingredient/${id}`)
    .then(result => result.json())
    .then((data) => {
      dispatch({
        type: EDIT_ITEM_LOAD,
        selectedEditItem : data
      });
      dispatch({
        type: EDIT_ITEM_REFRESH,
        refreshEditItem: false
      });  
      //EDIT_ITEM_REFRESH
      //this.setState({ selectedEditGroceryItem: data });
    });
  }
}
export const setEditItemQuantity = (id, quanity) => {
  const settings = appConfig;
  return (dispatch) => {
    dispatch({
      type: REQUEST_MODIFYING_EDIT_ITEM,
      modifyingEditItem: true
    });
    fetch(`${settings.RestServerLocation}/api/grocery/${id}/${quanity}`, {
      method: 'PUT',
    })
    .then(() => {
       dispatch({
        type: EDIT_ITEM_SET_QUANTITY,
      }); 
       dispatch({
        type: REQUEST_MODIFYING_EDIT_ITEM,
        modifyingEditItem: false
      });
/*       dispatch({
        type: EDIT_ITEM_REFRESH,
        refreshEditItem: true
      });  */
       dispatch({
        type: REFRESH_GROCERY_LIST,
        refreshGroceryList: true
      }); 
    });
  }
}
export const toggleEditItemVisibility = (showEditItem) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_ITEM_TOGGLE_VISIBILITY,
      showEditItem
    });
  }
}
export const requestModifyingEditItem = (modifyingEditItem) => {
  return {
    type: REQUEST_MODIFYING_EDIT_ITEM,
    modifyingEditItem
  }
}

