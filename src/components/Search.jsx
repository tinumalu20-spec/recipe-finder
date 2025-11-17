import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    if (!ingredient.trim()) return;
    setLoading(true);
    setRecipes([]);

    try {
      // Step 1: Get meals by ingredient
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      let data = await response.json();
      // 🔹 If no meals found, try searching by meal name instead
    if (!data.meals) {
      response = await fetch(
       `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
      );
      data = await response.json();
    }
     

      if (!data.meals) {
        setRecipes([]);
        alert("No recipes found for that search!");
        return;
      }

      // Step 2: Fetch detailed info for each meal by ID
      const detailedRecipes = await Promise.all(
        data.meals.map(async (meal) => {
          const detailRes = await fetch(
           `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          );
          const detailData = await detailRes.json();
          return detailData.meals ? detailData.meals[0] : null;        })
      );

      setRecipes(detailedRecipes.filter((r)=>r !==null));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-section" id="recipe-search">
      <Container style={{ maxWidth: "1200px" }}>

        <div className="text-center mb-4">
          <h2>🍳 Find Recipes by Ingredient</h2>
        </div>

        <div className="d-flex justify-content-center gap-2 mb-5">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Enter an ingredient or meal name..."
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <Button className="search-btn" onClick={fetchRecipes}>
            Search
          </Button>
        </div>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        )}

        <Row
  className="justify-content-center flex-wrap"
  style={{ gap: "20px", display: "flex" }}
>
  {recipes.map((recipe) => (
    <Col
      key={recipe.idMeal}
      xs="auto"
      className="d-flex justify-content-center"
      style={{ flex: "0 0 250px" }}
    >


              <Card className="recipe-card shadow-sm text-center">
                <Card.Img variant="top" src={recipe.strMealThumb} className="recipe-img" />
                <Card.Body>
                  <Card.Title>{recipe.strMeal}</Card.Title>
                  <Card.Text>
                    <strong>Category:</strong> {recipe.strCategory} <br />
                    <strong>Area:</strong> {recipe.strArea}
                  </Card.Text>
                  <Button
                    variant="outline-dark"
                    onClick={() => navigate(`/recipedetails/${recipe.idMeal}`)}
                  >
                    📖 View Recipe
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {!loading && recipes.length === 0 && (
            <p className="text-center text-muted">
              <br />
              🔎 Try searching for an ingredient to discover new recipes!
            </p>
          )}
        </Row>
      </Container>
    </section>
 );
}