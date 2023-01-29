import React from 'react'
import {createClient} from 'contentful';
import ArticleCard from '../components/ArticleCard';

export async function getStaticProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
  
    const res = await client.getEntries({'metadata.tags.sys.id[all]': 'blog'});
  
    return {
      props: {
        blogs: res.items,
      },
      revalidate: 1
    }
  }

export default function Blog({blogs}) {
    return (
        <div className="article-list">
            {blogs.map(article => (
                <ArticleCard key={article.sys.id} article={article}/>
            ))}
        </div>
    )
}
