"use client";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import AdBanner from "./AdBanner"; // ✅ Create an AdBanner component

export default function HomeClient({ articles }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.fields.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const postsToDisplay = searchValue.length > 0 ? filteredArticles : articles;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search articles..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* No Posts Found */}
      {!filteredArticles.length && (
        <p className="text-center text-gray-400 mt-4">No posts found.</p>
      )}

      {/* Bento Grid Layout with Ads */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] lg:auto-rows-[350px] mt-6">
        {postsToDisplay.map((article, index) => (
          <>
            {/* Inject an Ad after every 6th item */}
            {index > 0 && index % 10 === 0 && (
              <div
                key={`ad-${index}`}
                className="col-span-2 row-span-1 flex justify-center items-center bg-gray-800 rounded-xl shadow-md"
              >
                <AdBanner />
              </div>
            )}

            {/* Article Card */}
            <div
              key={article.sys.id}
              className={`relative transition-transform hover:scale-[1.02] hover:shadow-lg rounded-xl overflow-hidden h-full
              ${index % 7 === 0 ? "col-span-2 row-span-2 h-[450px]" : ""}
              ${index % 5 === 0 ? "col-span-1 row-span-2 h-[400px]" : ""}
              `}
            >
              <ArticleCard article={article} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
