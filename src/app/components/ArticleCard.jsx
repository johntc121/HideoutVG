import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ article }) {
  const { title, slug, thumbnail, excerpt, author } = article.fields;
  let { createdAt } = article.sys;
  const date = new Date(createdAt).toString().split(" ").slice(1, 4).join(" ");

  return (
    <Link href={`/articles/${slug}`} className="group block w-full">
      <div className="relative flex items-center gap-4 py-4 transition-opacity hover:opacity-80">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="aspect-[16/9] w-64 relative rounded-md overflow-hidden">
            <Image
              src={`https:${thumbnail.fields.file.url}`}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col w-full">
          <p className="text-xs text-gray-500">
            {author} <span className="ml-2">{date}</span>
          </p>

          <h2 className="text-lg sm:text-xl font-semibold leading-tight text-white">
            {title}
          </h2>

          {excerpt && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{excerpt}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
