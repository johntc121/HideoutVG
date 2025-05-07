import { createClient } from "contentful";
import "server-only";
import ArticleClient from "./components/ArticleClient";

async function getArticles() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "article",
    order: "-sys.createdAt", // Sort by createdAt descending (newest first)
  });
  return res.items;
}

export const metadata = {
  title: "HideoutVG - Gaming News & Reviews",
  description:
    "Stay updated with the latest gaming news, reviews, and insights from HideoutVG.",
};

export default async function Home() {
  const articles = await getArticles();
  // const largearticles = [...articles, ...articles, ...articles];

  return <ArticleClient articles={articles} />;
}

export const revalidate = 60;
