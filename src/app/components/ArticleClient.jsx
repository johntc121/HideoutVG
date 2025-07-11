"use client";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleClient({ articles }) {
  const [searchValue, setSearchValue] = React.useState("");

  // Get the first article as the featured article
  const featuredArticle = articles.length > 4 ? articles[0] : null;

  // Filter remaining articles for the grid
  const nonFeaturedArticles =
    articles.length > 4 ? articles.slice(1) : articles;

  // Filter articles based on search value
  const filteredArticles = nonFeaturedArticles.filter((article) =>
    article.fields.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SIDE: STACKED ARTICLE LIST */}
      <div className="lg:col-span-2">
        {/* Search Bar */}
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-4 py-3 text-white bg-card border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Articles List */}
        {!filteredArticles.length && (
          <p className="text-center text-gray-400">No posts found.</p>
        )}

        <div className="space-y-8">
          {filteredArticles.map((article, index) => (
            <div key={article.sys.id} className="border-b border-gray-700 pb-6">
              <ArticleCard article={article} isStacked={true} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: SIDEBAR */}
      <div className="space-y-6">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="bg-card rounded-xl overflow-hidden shadow-md p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Featured Article
            </h2>
            <ArticleCard article={featuredArticle} isFeatured={true} />
          </div>
        )}

        {/* Twitter Feed (Placeholder) */}
        {/* <div className="bg-card rounded-xl overflow-hidden shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Latest Tweets
          </h2>
          <div className="overflow-hidden rounded-lg">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="HideoutVG"
              options={{ height: 500, theme: "dark" }}
              noHeader
              noFooter
              noBorders
              placeholder={
                <p className="text-gray-500 text-sm">Loading tweets...</p>
              }
              onLoad={() => console.log("Twitter feed loaded")}
            />
          </div>
        </div> */}
        <div className="bg-card rounded-xl overflow-hidden shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Latest Tweets
          </h2>
          <p className="text-gray-400 text-sm mb-3">
            Follow us on Twitter for daily gaming news and updates.
          </p>
          <a
            href="https://twitter.com/HideoutVG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-accent/50 text-white rounded hover:bg-accent/90"
          >
            Follow @HideoutVG
          </a>
        </div>
      </div>
    </div>
  );
}
