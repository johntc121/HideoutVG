import { createClient } from "contentful";
import "server-only";
import ArticleClient from "../components/ArticleClient";

async function getBlogs() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    "metadata.tags.sys.id[all]": "blog",
    order: "-sys.createdAt", // sort by newest createdAt
  });
  return res.items;
}

export const metadata = {
  title: "Blogs - HideoutVG",
  description: "Read in-depth blogs of the latest games on HideoutVG.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <ArticleClient articles={blogs} />;
}

export const revalidate = 60;
