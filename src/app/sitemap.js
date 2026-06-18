import { createClient } from "contentful";

export default async function sitemap() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const articles = await client.getEntries({
    content_type: "article",
  });

  const articleUrls = articles.items.map((article) => ({
    url: `https://www.hideoutvg.com/articles/${article.fields.slug}`,
    lastModified: article.sys.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.hideoutvg.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.hideoutvg.com/news",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://www.hideoutvg.com/reviews",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...articleUrls,
  ];
}