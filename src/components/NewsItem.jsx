import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

const NewsItem = ({ article, isBookmarked, onBookmark }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-bold mb-2">{article.title}</h2>
        <p className="text-sm mb-4">{article.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:underline"
          >
            Read More
          </a>
          <button onClick={onBookmark} aria-label="Bookmark this article">
            {isBookmarked ? (
              <BookmarkCheck className="text-green-400" />
            ) : (
              <Bookmark className="text-gray-400 hover:text-green-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
