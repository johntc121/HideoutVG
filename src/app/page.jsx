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
  title: "Gaming News, Reviews, and Features | HideoutVG",
  description:
    "HideoutVG covers gaming news, reviews, features, and opinion pieces across PlayStation, Xbox, Nintendo, PC, and more.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const articles = await getArticles();
  // const largearticles = [...articles, ...articles, ...articles];

  return <ArticleClient articles={articles} />;
}

export const revalidate = 60;
