import React,{useState,useEffect} from "react";
import { Link,useParams,useNavigate} from "react-router-dom";
import "./RecipeDetails.css";

function RecipeDetails(){
    const{id}= useParams();
    const[recipe,setRecipe]=useState(null);
    const [favorites, setFavorites]= useState([]);

    const navigate = useNavigate();
    const handleViewFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.length === 0) {
            alert("No favorites added yet!");
        } else {
            navigate("/favorites");
        }
    };

    useEffect(()=>{
        if(!id) return;
        const fetchRecipe=async()=>{
            try{
                const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const json=await res.json();
                setRecipe(json.meals ? json.meals[0]:null);
            }catch(err){
                console.error("failed to fetch recipe:",err);
                setRecipe(null);
            }
        };
        fetchRecipe();
        },[id])

    const ingredients=[];
    if(recipe){
    for(let i=1;i<=20;i++){
        const ingredient=recipe[`strIngredient${i}`];
        const measure=recipe[`strMeasure${i}`]||"";
        if (ingredient && ingredient.trim() !== ""){
            const text = measure.trim() ? `${measure.trim()} ${ingredient.trim()} `: ingredient.trim();
            ingredients.push(text);
        }
    }
}
    const handleFavorites=()=>{
        if(!recipe) return alert("No recipe to save.");
        const existing=JSON.parse(localStorage.getItem("favorites")) || [];
        const alreadyAdded=existing.find(item=> item.idMeal === recipe.idMeal);
        if (!alreadyAdded){
            const updated=[...existing,recipe];
            localStorage.setItem("favorites",JSON.stringify(updated));
            setFavorites(updated);
            alert("Added to favorites!");
        }
        else{
            alert("Already in favorites!");
        }
        }
        if(!recipe){
            return <div style={{padding:20}}><p>Loading recipe...</p></div>
        }

    return (
  <div className="recipe-details">
    <div className="recipe-container">

            <Link to="/search" className="back-link">← Back to Search</Link>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width="400px" style={{ borderRadius: 8, margin: "12px 0"}}/>
            <h3>Ingredients:</h3>
            <ul>
                {ingredients.map((item, index)=>(
                    <li key={index}>{item}</li>
                )
            )}
            </ul>
            {/* <button onClick={handleFavorites}>Add to Favorites </button> */}
            <div style={{ marginTop: "15px" }}>
  <button
    onClick={handleFavorites}
    style={{
      
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "10px",
    }}
  >
    Add to Favorites 
  </button>

  <button
    onClick={handleViewFavorites}
    style={{
      
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    View Favorites
  </button>
</div>

            <h3 style={{ marginTop: 20 }}>Instructions:</h3>
            <p style={{whiteSpace:"pre-line"}}>{recipe.strInstructions}</p>

        </div>
        </div>
);

    
}


export default RecipeDetails