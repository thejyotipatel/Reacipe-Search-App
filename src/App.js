import React, {useEffect, useState} from 'react'  
 
import Reacipe from './components/Reacipe'
import './components/style.css'


const App = () => {
  const APP_ID = 'app__id'
  const  APP_KEY = 'app__key'
  
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('mango')

  useEffect(() =>{ 
    getRecipes()
  }, [query])

  const getRecipes = async () =>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )

    const data = await response.json()
    setRecipes(data.hits) 
    
    console.log(data)

  }

  const updateSearch = e => {
    setSearch(e.target.value)  
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch("")
  }
  return (
    <div onSubmit={getSearch} className="app">
      <h1>Recipe App</h1> 
      <form 
        action="" 
        className="search-form">
          <div> 
        <input 
          type="text" 
          placeholder="Search for Recipes"
          value={search}  
          onChange={updateSearch}
        />

        <button  
          types="submit">
          <i className="fas fa-search"></i>
        </button>
        </div>
      </form>

      <div className="recipes"> 
        {recipes.map(recipe =>( 
          
          <Reacipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            cuisineType={recipe.recipe.cuisineType}
            source={recipe.recipe.source}
            totalTime={recipe.recipe.totalTime}
            url={recipe.recipe.url}
          /> 
        ))}
      
      </div>
    </div>
  )
   
} 

export default App 
