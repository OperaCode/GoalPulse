import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsItem from "../components/NewsItem";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);

  const handleBack = () => navigate(-1); // go back to previous page

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="bg-green-600 px-4 py-2 rounded-full hover:bg-green-500 transition font-medium"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">📌 Bookmarked Articles</h1>
        <div /> {/* Empty div to balance flex alignment */}
      </header>

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-4">You have no bookmarks yet.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-500 transition"
          >
            Browse News
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article, i) => (
            <NewsItem key={i} article={article} isBookmarked={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
