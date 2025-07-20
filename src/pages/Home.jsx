import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NewsItem from "../components/NewsItem";
import FeaturedMatch from "../components/FeaturedMatch";
import BookmarksPage from "../components/Bookmarks";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash/debounce";

const categories = [
  "All",
  "Premier League",
  "La Liga",
  "Serie A",
  "Champions League",
  "Transfers",
];

const Home = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [bookmarks, setBookmarks] = useState(() =>
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value) => setSearchQuery(value), 300),
    []
  );

  const fetchNews = useCallback(
    async (category, pageNum = 1, append = false) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: category === "All" ? "football" : `football ${category.toLowerCase()}`,
            sortBy: "publishedAt",
            language: "en",
            pageSize: 10,
            page: pageNum,
            apiKey: import.meta.env.VITE_NEWS_API_KEY,
          },
        });
        const data = res.data.articles.filter(
          (article) => article.urlToImage && article.title && article.description
        );
        if (data.length === 0 && !append) {
          setError("No articles found for this category.");
          setFeatured(null);
          setArticles([]);
        } else {
          if (append) {
            setArticles((prev) => [...prev, ...data]);
          } else {
            setFeatured(data[0]);
            setArticles(data.slice(1));
          }
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setPage(1);
    fetchNews(activeCategory, 1, false);
  }, [activeCategory, fetchNews]);

  const filteredNews = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(activeCategory, nextPage, true);
  };

  const handleBookmark = (article) => {
    const exists = bookmarks.find((b) => b.url === article.url);
    let updatedBookmarks;
    if (exists) {
      updatedBookmarks = bookmarks.filter((b) => b.url !== article.url);
    } else {
      updatedBookmarks = [...bookmarks, article];
    }
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (article) =>
    bookmarks.some((b) => b.url === article.url);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 sticky top-0 z-20 shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="text-green-400 hover:text-green-300 transition"
          aria-label="Go back"
        >
          ← Back
        </button>
        <Link to="/">
          <h1 className="text-2xl font-bold flex items-center gap-2 cursor-pointer">
            GoalPulse
          </h1>
        </Link>
        <Link to="/bookmarks">
          <button
            className="bg-green-600 px-4 py-2 rounded-full font-medium hover:bg-green-500 transition"
            aria-label="View bookmarks"
          >
            Bookmarks ({bookmarks.length})
          </button>
        </Link>
      </header>

      {/* Hero Banner */}
      <AnimatePresence>
        {featured && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center relative"
            style={{
              backgroundImage: `url(${
                featured.urlToImage || "/fallback-image.jpg"
              })`,
            }}
            role="banner"
            aria-label="Featured news article"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-10 max-w-3xl text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 line-clamp-3">
                {featured.title}
              </h1>
              <p className="mb-6 line-clamp-2">{featured.description}</p>
              <a
                href={featured.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-500 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label={`Read more about ${featured.title}`}
              >
                Read More
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search news..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            aria-label="Search news articles"
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-8" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-green-600"
                  : "bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
              }`}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-label={`Filter news by ${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {loading && page === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-800 rounded-lg h-64"
                aria-hidden="true"
              ></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-400" role="alert">
            {error}
          </p>
        ) : filteredNews.length === 0 ? (
          <p className="text-center text-gray-400" role="alert">
            No news articles found for your search.
          </p>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredNews.map((article, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NewsItem
                    article={article}
                    isBookmarked={isBookmarked(article)}
                    onBookmark={() => handleBookmark(article)}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-500 transition"
              >
                Load More
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home
;
