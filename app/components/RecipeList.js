import React, {Component, PropTypes} from 'react';

const RecipeList = (props) => {
    debugger;
    const recipeListItems = props.listofRecipes.map((recipeName) =>
    <li key={recipeName.toString()} item={recipeName}>{recipeName}</li>
);
return (  
    <div> 
<h2>Recipe List</h2>     
<ul>
    {recipeListItems}
</ul>
</div>
);  
  };
  
  RecipeList.propTypes = {
    listofRecipes: React.PropTypes.array
};
  export default RecipeList;