import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Button, Card } from "react-bootstrap";
import Footer from "./Footer";
import "./Recipe.css"; // <-- Add this line for custom styling

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <Container className="text-center mt-5">
        <h2>❌ Recipe not found</h2>
        <Footer />
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Img variant="top" src={recipe.strMealThumb} alt={recipe.strMeal} />
            </Card>
          </Col>
          <Col md={6}>
            <h2 className="fw-bold mb-3">{recipe.strMeal}</h2>
            <p><strong>Category:</strong> {recipe.strCategory}</p>
            <p><strong>Area:</strong> {recipe.strArea}</p>
            <p><strong>Tags:</strong> {recipe.strTags || "None"}</p>
            <Button
              variant="dark"
              className="mt-3"
              onClick={() => window.open(recipe.strYoutube, "_blank")}
            >
              ▶️ Watch on YouTube
            </Button>
          </Col>
        </Row>

        <hr className="my-5" />

        <Row>
          <Col>
            <h3 className="fw-bold mb-3">🧂 Ingredients</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map(i => {
                  const ingredient = recipe[`strIngredient${i}`];
                  const measure = recipe[`strMeasure${i}`];
                  return ingredient ? (
                    <li key={i}>{ingredient} - {measure}</li>
                  ) : null;
                })}
            </ul>

            <h3 className="fw-bold mt-5 mb-3">👨‍🍳 Instructions</h3>
            <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>
          </Col>
        </Row>
      </Container>

      {/* Floating Back Button */}
      <Button
        variant="info"
        className="back-to-home-btn"
        onClick={() => navigate("/home")}
      >
        ⬅️ Back to Home
      </Button>

      <Footer />
    </>
  );
}
