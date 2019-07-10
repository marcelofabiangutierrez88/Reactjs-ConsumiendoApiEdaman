import React, {useEffect, useState} from 'react';
import './App.css';
import Recipes from './Recipes';
import { async } from 'q';

const App=()=>{
  const APP_ID = "8bcb48f5";
  const APP_KEY="31aea013b30d9b0589fcfa87534b622f";
 // const examplereq= `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}` ;

  //const [counter, setCounter] = useState (0);

  const [recipes, setRecipes] = useState([]);
  const[search, setSearch] = useState("");
  const[query, setQuery ] = useState ('chicken');

  useEffect( ()=>{
      getRecipes ();
  }, [query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const UpdateSearch =e =>{
    setSearch(e.target.value);

  };
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    //getSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Ingrese su busqueda en Ingles..."value={search} onChange={UpdateSearch}  />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <h3 ><center>App en React + API recipe.com</center></h3>
      <h5 ><center>Busca el ingrediente deseado y traera recetas desde Recipe.com, ademas cada plato tendra sus calorias</center></h5>

        <p><center>Realizado por Marcelo Gutierrez 2019</center></p>
      <div className="recipies">
        {recipes.map(recipe =>(
            <Recipes
             key={recipe.recipe.label}
             title={recipe.recipe.label} 
             calories={recipe.recipe.calories} 
             image={recipe.recipe.image}
             ingredients={recipe.recipe.ingredients}
             
             />
             
        ))}
        </div>
     </div>
  );
}



export default App;
