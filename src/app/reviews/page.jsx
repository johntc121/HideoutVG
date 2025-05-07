import { createClient } from "contentful";
import "server-only";
import ArticleClient from "../components/ArticleClient";

async function getReviews() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    "metadata.tags.sys.id[all]": "review",
  });
  //const res = await client.getEntries({ content_type: "article" });
  return res.items;
}

export const metadata = {
  title: "Reviews - HideoutVG",
  description: "Read in-depth reviews of the latest games on HideoutVG.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  //const largereviews = [...reviews, ...reviews, ...reviews];

  return <ArticleClient articles={reviews} />;
}

export const revalidate = 60;
