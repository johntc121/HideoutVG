import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import "server-only";
import Skeleton from "../../components/Skeleton";
import Disqus from "./Disqus";
import EmbeddedVideo from "./EmbeddedVideo";

async function getArticle(slug) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
  });

  return res.items[0] || null;
}

// ✅ Dynamic SEO Metadata
export async function generateMetadata({ params: rawParams }) {
  const params = await rawParams;
  if (!params || !params.slug) {
    return {
      title: "Article Not Found",
      description: "No description available",
    };
  }

  const article = await getArticle(params.slug);
  return {
    title: article ? article.fields.title : "Article Not Found",
    description: article
      ? article.fields.description
      : "No description available",
  };
}

export default async function ArticlePage({ params: rawParams }) {
  const params = await rawParams;
  if (!params || !params.slug) {
    return <h1>Invalid article request</h1>;
  }

  const article = await getArticle(params.slug);

  if (!article) return <Skeleton />; // ✅ Loading state if article is not found

  const { featuredImage, title, articleText } = article.fields;
  console.log(articleText);

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
            <iframe
              className="embedded-video"
              src={node.data.target.fields.url}
              title={node.data.target.fields.title}
              allowFullScreen
              loading="lazy"
            />
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <Image
          className="embedded-asset"
          src={`https:${node.data.target.fields.file.url}`}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
          alt={node.data.target.fields.description || "Contentful Image"}
          priority={true}
        />
      ),
    },
  };

  return (
    <article className="max-w-3xl mx-auto p-6">
      <section className="banner">
        {featuredImage && (
          <Image
            src={`https:${featuredImage.fields.file.url}`}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
            alt={title}
          />
        )}
        <h2 className="text-4xl font-bold">{title}</h2>
      </section>
      <section className="article-content">
        <article>
          {documentToReactComponents(articleText, renderOptions)}
        </article>
      </section>
      <Disqus slug={article.fields.slug} />{" "}
      {/* ✅ Disqus comments & interactivity */}
    </article>
  );
}

// 🔥 ISR: Refreshes article every 60 seconds
export const revalidate = 60;
