import React from 'react';
import PropTypes from 'prop-types';

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
    listofRecipes: PropTypes.array
};

export default RecipeList;