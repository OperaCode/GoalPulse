import "./App.css";

import Landing from "./pages/Landing";
 import Home from "./pages/Home";
 import BookmarksPage from "./components/Bookmarks";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>

      
    </>
  );
}

export default App;
