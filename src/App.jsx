import "./App.css";

import Landing from "./pages/Landing";
 import Home from "./pages/Home";
 import FeaturedMatch from "./components/FeaturedMatch";
 import BookmarksPage from "./components/Bookmarks";
 import QuoteOfTheDay from "./components/Quote";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/features" element={<FeaturedMatch />} />
        <Route path="/quote" element={<QuoteOfTheDay />} />

       
      </Routes>

      
    </>
  );
}

export default App;
