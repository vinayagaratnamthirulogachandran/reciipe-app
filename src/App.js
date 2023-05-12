import React, { useState, useEffect } from 'react';
import './App.css';

const YOUR_APP_ID = "f9ba6850";
const YOUR_APP_KEY = "dfcff312d2487bbc5d94f6351b655c58";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchClick = () => {
    setIsLoading(true);
  }

  const getRecipes = async (query) => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.hits);
    setIsLoading(false);
  }

  useEffect(() => {
    if (searchTerm) {
      try {
        getRecipes(searchTerm);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("An error occurred while fetching data");
      }
    } else {
      setRecipes([]);
    }
  }, [searchTerm]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  }

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <div className="search-container">
        <input type="text" placeholder="Enter ingredient or dish name" value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <button onClick={handleSearchClick} disabled={isLoading}>{isLoading ? "Loading..." : "Search"}</button>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ul className="recipe-list">
        {recipes.map((recipe, index) => (
          <li key={index} className="recipe-item">
            <div className="recipe-image" style={{backgroundImage: `url(${recipe.recipe.image})`}}></div>
            <div className="recipe-details">
              <h2>{recipe.recipe.label}</h2>
              <ul className="ingredients-list">
                {recipe.recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.text}</li>
                ))}
              </ul>
              <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;