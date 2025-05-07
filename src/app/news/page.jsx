import { createClient } from "contentful";
import "server-only";
import ArticleClient from "../components/ArticleClient";

async function getNews() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    "metadata.tags.sys.id[all]": "news",
    order: "-sys.createdAt", // sort by newest createdAt
  });
  //const res = await client.getEntries({ content_type: "article" });
  return res.items;
}

export const metadata = {
  title: "News - HideoutVG",
  description: "Read in-depth news of the latest games on HideoutVG.",
};

export default async function NewsPage() {
  const news = await getNews();
  //const largeNewsSet = [...news, ...news, ...news];

  return <ArticleClient articles={news} />;
  //return <HomeClient2 articles={largeNewsSet} />;
}

export const revalidate = 60;
