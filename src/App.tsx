import React from "react";
import Home from "./pages/home/home";
import Bookmark from "./pages/bookmark/bookmark";
import Details from "./pages/details/details";
import DetailsComic from "./pages/details/detailsComic";
import Header from "./components/layout/header";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/details" element={<Details />} />
          <Route path="/details-comic" element={<DetailsComic />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
