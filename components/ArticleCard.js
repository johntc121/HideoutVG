import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Article({article}) {
    const {title, slug, thumbnail, excerpt, author} = article.fields;
    let {updatedAt} = article.sys
    const date = new Date(updatedAt);
    updatedAt = date.toString();
    updatedAt = updatedAt.split(' ').slice(1,4);
    updatedAt = `${updatedAt[0]} ${updatedAt[1]}, ${updatedAt[2]}`
    
    return (
        <Link href={`/articles/${slug}`}>
            <div className="article-card">
                <div className="featured">
                    <Image 
                        className="thumbnail"
                        src={`https:${thumbnail.fields.file.url}`}
                        width={350}
                        height={175}  
                    />
                </div>
                <div className="article-card-content">
                    <div className="info">
                        <p className="author">{author} <span className="updatedAt">{updatedAt}</span></p><br/>
                        <h2 className="title">{title}</h2><br/>
                        <p className="excerpt">{excerpt}</p>
                    </div>
                </div>
                <style jsx>
                    {`
                        .article-card {
                            display: flex;
                            border-bottom: 2px solid lightgray;
                            padding: 20px 0;
                            align-items: center;
                        }
                        .article-card:hover {
                            cursor: pointer;
                        }
    
                        .featured {
                            max-width: 40%;
                            position: relative;
                            border-radius: 16px;
                            overflow:hidden;
                        }
    
                        .article-card-content {
                            display: flex;
                            flex-direction: column;
                            align-content: flex-start;
                            justify-content: space-around;
                            align-items: flex-start;
                            padding: 25px 25px;
                            max-width: 60%;
                        }

                        .info {
                            line-height: 1.25rem;
                        }

                        .title {
                            display: inline;
                            font-weight: bold;
                            font-size: 18px;
                        }
                        .updatedAt {
                            display: inline;
                            font-size: 10px;
                            color: #cdcdcd;
                        }
                        .excerpt {
                            display: inline;
                            font-size: 12px;
                        }
                        .author {
                            display: inline;
                            font-size: 14px;

                        }

                        @media only screen and (max-width: 1100px) {
                            .excerpt {
                                display: none;
                            }
                        }
                        @media only screen and (max-width: 800px) {
                            .article-card {
                                flex-direction: column;
                            }
                            .featured {
                                max-width: unset;
                            }
                            .article-card-content {
                                max-width: unset;
                            }
                            .title {
                                 font-size: 16px
                            }
                        }
                        @media only screen and (max-width: 750px) {
                            .article-card {
                                padding: 20px 20px;    
                            }

                            .article-card-content {
                                padding: 15px 15px;
                            }
                        }
                        @media only screen and (max-width: 570px) {
                            .article-card {
                                padding: 15px 15px;     
                            }

                            .article-card-content {
                                padding: 10px 10px;
                                line-height: 0.0000000000000000000000000001;
                            }
                            .title{
                                display: inline;
                                font-size: 12px;
                                line-height: 2;
                            }
                            .author, .updatedAt {
                                display: none;
                            }
                        }

                        @media only screen and (max-width: 500px) {
                            .article-card {
                                padding: 10px 10px;    
                            }

                            .article-card-content {
                                padding: 5px 5px;
                            }
                        }
                    `}
                </style>
            </div>
        </Link>
    )
}

