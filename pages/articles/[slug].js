import { createClient } from 'contentful'
import Image from 'next/image'
import React, {useEffect} from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Skeleton from '../../components/Skeleton'
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ 
    content_type: "article" 
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'article',
    'fields.slug': params.slug
  });

  
  

  if(!items.length) {
    return{
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { article: items[0] },
    revalidate: 1
  }

}

const renderOptions = {
  renderNode: {
    
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <iframe
            className='embedded-video'
            src={node.data.target.fields.url}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // render the EMBEDDED_ASSET as you need
      return (
        <img
          className='embedded-asset'
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

export default function ArticleDetails({ article }) {
  const loadComments = () => {
    var disqus_config = function () {
      this.page.url = window.location.href;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = article.fields.slug; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    const script = document.createElement('script');
    script.src = 'https://hideoutvg.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());

    document.body.appendChild(script);
  }

  
  useEffect(() => {
    loadComments();
  }, [])


  if(!article) {
    return (
      <Skeleton />
    )
  }
  const {featuredImage, title, articleText} = article.fields;
  //console.log(articleText)
  return (
    <article className="article">
      <section className="banner">
        {
          featuredImage ? <Image 
            src={`https:${featuredImage.fields.file.url}`}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
          /> :
          <></> 
      }
        <h2>{title}</h2>
      </section>

      <section className="article-content">
        <article>{documentToReactComponents(articleText, renderOptions)}</article>
      </section>

      <div id="disqus_thread"></div>

      <style jsx>{`
        .article-content {
          font-size: 0.75em;
        }
      `}</style>
    </article>
  )
}