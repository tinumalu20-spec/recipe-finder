
import React from "react";
import { Carousel as BootstrapCarousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import "./Carousel.css";

function Carousel() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/home"); 
  };

  return (
    <BootstrapCarousel fade interval={3000} controls={false} indicators={false}>
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={img1}
          alt="Plant 1"
        />
        <BootstrapCarousel.Caption>
          <h3>Delicious Recipes</h3>
          <p>Explore new tastes every day!</p>
          <Button variant="outline-warning" onClick={handleExplore}>
            Explore More
          </Button>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={img2}
          alt="Plant 2"
        />
        <BootstrapCarousel.Caption>
          <h3>Fresh Ingredients</h3>
          <p>Healthy, tasty, and easy to cook.</p>
          <Button variant="outline.warning" onClick={handleExplore}>
            Explore More
          </Button>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={img3}
          alt="Plant 3"
        />
        <BootstrapCarousel.Caption>
          <h3>Cook Like a Pro</h3>
          <p>Discover step-by-step recipes from around the world.</p>
          <Button variant="outline-warning" onClick={handleExplore}>
            Explore More
          </Button>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
}

export default Carousel;
