import { connect } from 'react-redux';
import RecipeList from '../Components/RecipeList';
import {
    selectRecipe,
    addRecipeIngredientsToGroceryList,
    getRecipeList,
} from '../Actions/ActionCreators';

const recipeListAddClickHandler = () => {
    /*const settings = appConfig;

   fetch(`${settings.RestServerLocation}/Api/grocery`)
     .then(result => result.json())
     .then((data) => {
       this.setState({ Ingredients: data.Ingredients });
     });*/
}

const recipeListViewClickHandler = (id) => {
    /*const settings = appConfig;

     fetch(`${settings.RestServerLocation}/Api/recipe/${id}`)
      .then(result => result.json())
      .then((data) => {
        this.setState({ Recipe: data });
      }); */
}

const mapStateToProps = (state) => {
    return{
        RecipeList: state.recipeReducer.RecipeList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addclick: (id) => {
        dispatch(addRecipeIngredientsToGroceryList(id));
    },
    viewclick: (id) => {
        dispatch(selectRecipe(id));
    },
    getRecipeList: () => {
        dispatch(getRecipeList());
    },
})

const RecipeListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
    )(RecipeList);

export default RecipeListContainer;