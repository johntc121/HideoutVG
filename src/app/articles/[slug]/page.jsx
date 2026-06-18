import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import "server-only";
import Skeleton from "../../components/Skeleton";
import Disqus from "./Disqus";
import EmbeddedVideo from "./EmbeddedVideo";
import ConvertKit from "./ConvertKit";
import { notFound } from "next/navigation";

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

export async function generateStaticParams() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "article",
    select: ["fields.slug"],
  });

  return res.items.map((article) => ({
    slug: article.fields.slug,
  }));
}

// ✅ Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | HideoutVG",
      description: "This article could not be found.",
    };
  }

  const { title, description, featuredImage } = article.fields;
  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}`
    : null;

  return {
    title,
    description,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.hideoutvg.com/articles/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params: rawParams }) {
  const params = await rawParams;
  if (!params || !params.slug) {
    return <h1>Invalid article request</h1>;
  }

  const article = await getArticle(params.slug);

  if (!article) notFound(); // ✅ Loading state if article is not found

  const { featuredImage, title, articleText } = article.fields;

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
      <ConvertKit />
      <Disqus slug={article.fields.slug} />{" "}
      {/* ✅ Disqus comments & interactivity */}
    </article>
  );
}

// 🔥 ISR: Refreshes article every 60 seconds
export const dynamicParams = true;
export const revalidate = 60;