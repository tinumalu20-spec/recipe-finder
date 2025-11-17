import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Favorites.css";
import 'bootstrap/dist/css/bootstrap.min.css';



function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const handleRemove = (idMeal) => {
    const updated = favorites.filter((item) => item.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="favorites-page">
      <Container>
        <Row className="justify-content-center text-center mt-5">
          <Col md={10}>
            <h2 className="mb-4 text-warning">❤ Your Favourite Recipes</h2>

            {favorites.length === 0 ? (
              <p className="no-favorites">No favourites added yet!</p>
            ) : (
              <Row className="justify-content-center">
                {favorites.map((meal) => (
                  <Col key={meal.idMeal} md={4} className="mb-4">
                    <Card className="favorite-card shadow-sm">
                      <Card.Img
                        variant="top"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                      />
                      <Card.Body>
                        <Card.Title>{meal.strMeal}</Card.Title>
                        <div className="favorite-actions">
                          <Link
                            to={`/recipedetails/${meal.idMeal}`}
                            className="btn btn-warning me-2"
                          >
                            View Recipe
                          </Link>
                          <Button
                            variant="outline-warning"
                            onClick={() => handleRemove(meal.idMeal)}
                          >
                            Remove
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

     
    </div>
  );
}

export default Favorites;