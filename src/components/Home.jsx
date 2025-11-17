import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      

      {/* === Hero Section === */}
      <section className="hero-section" id="home">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
               <br /><br /><br /><br /><br />
              <h1>
                🍲 Welcome to <span className="text-warning">Food Paradise</span>
              </h1>
              <p>
                Food Paradise is more than just a recipe finder — it’s a modern startup built around
                the love for home-cooked meals. We believe that great food starts in your kitchen,
                and with the right inspiration, anyone can become a chef at home. Our platform helps
                you discover, create, and enjoy recipes tailored to your taste, ingredients, and
                lifestyle. Whether you’re looking for quick breakfasts, hearty lunches, or cozy
                dinners, Food Paradise makes your cooking journey simple, personalized, and joyful.
                Step into a world where every recipe feels like home — flavorful, fresh, and full of
                happiness.
              </p>
              <div className="mt-4 d-flex gap-3">
                <Button variant="warning" onClick={() => navigate("/search")}>
                  🔍 Search Recipes
                </Button>
                {/* <Button variant="outline-dark" onClick={() => navigate("/recipe details")}>
                  📖 View Details
                </Button> */}
                <Button variant="outline-warning" onClick={() => navigate("/favorites")}>
                  ❤️ Favorites
                </Button>
              </div>
            </Col>

            <Col md={6}>
              <img src={img4} alt="food" className="hero-img" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* === Culinary Paradise Section (Full Page) === */}
      <section className="culinary-section">
        <Container>
          <div className="text-center">
            <h2>🥗 Step Into Your Culinary Paradise</h2>
            <p className="culinary-text">
              Explore a world of delicious flavors — from energizing breakfasts to wholesome lunches
              and comforting dinners. Each recipe is crafted to bring out your creativity and make
              your kitchen the heart of your home.
            </p>
          </div>

          <Row className="justify-content-center mt-5">
            <Col md={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src={img5} className="culinary-img" />
                <Card.Body>
                  <Card.Title>Breakfast</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src={img6} className="culinary-img" />
                <Card.Body>
                  <Card.Title>Lunch</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src={img7} className="culinary-img" />
                <Card.Body>
                  <Card.Title>Dinner</Card.Title>
                </Card.Body>
              </Card>

              {/* ✅ Trending button centered below cards */}
              <div className="text-center mt-4">
                <Button
                  variant="dark"
                  className="trending-btn"
                  onClick={() => navigate("/trending")}
                >
                  🔥 Trending Recipes
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
