import { useState } from 'react'
import {createClient} from 'contentful';
import ArticleCard from '../components/ArticleCard';

export async function getStaticProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
  
    const res = await client.getEntries({content_type: 'article'});
    //const res = await client.getEntries({'metadata.tags.sys.id[all]': 'review'})
    
    return {
      props: {
        articles: res.items,
      },
      revalidate: 1
    }
  }

export default function Home({articles}) {
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = articles.filter(article => ((article.fields.title.toLowerCase()).includes(searchValue.toLowerCase())));
  console.log(filteredPosts);

  const postsToDiplay = (searchValue.length > 0) ? filteredPosts : articles
  return (
      <>
        <div className='home-container'>
          <div className="article-list">
            <div className='search-container'>
              <input
                      aria-label="Search articles"
                      type="text"
                      placeholder="Search articles"
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="search-bar"
                  />
            </div>
            {!filteredPosts.length && 'No posts found.'}
            {postsToDiplay.map(article => (
                <ArticleCard key={article.sys.id} article={article}/>
            ))}
          </div>
          <div className="featured-container"></div>
        </div>
        <style jsx>{`
          .home-container {
            width: 100%;
            display: flex;
          }
        `}</style>
      </>
  )
}


