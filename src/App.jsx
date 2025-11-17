import React from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Trending from "./components/Trending";
import Recipe from "./components/Recipe";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";
import Search from "./components/Search";
import Favorites from "./components/Favorites";

// 👇 Wrapper to conditionally render Navbar
function Layout() {
  const location = useLocation();
  const hideNavbarPaths = ["/trending","/"];
  // paths without navbar

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}  {/* Navbar hidden on Trending */}
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Carousel />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/recipe/:id" element={<Recipe />} /> 
          <Route path="/recipedetails/:id" element={<RecipeDetails/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/favorites" element={<Favorites/>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
