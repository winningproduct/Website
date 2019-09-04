import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ( edges ) => { 
  const { posts} = edges
  return (<div className="columns is-multiline">
    {posts.map( post => {
      return (
        <div className="column is-4 m-subArticle" style = { style } key={post.node.id}>
          <article
            className={`blog-list-item tile is-child box notification m-article ${
              post.node.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
          >
            <header>
              <p className="post-meta">
                <Link
                  className="title has-text-primary is-size-4"
                  to={post.node.fields.slug}
                >
                  {post.node.frontmatter.title.replace(/[0-9]*-/g, '')}
                </Link>
                <span> &bull; </span>
              </p>
            </header>
            {post.node.frontmatter.featuredimage ? (
              <div className="featured-thumbnail">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.node.frontmatter.featuredimage,
                    alt: `featured image thumbnail for post ${
                      post.node.title
                      }`,
                  }}
                />
              </div>
            ) : null}
            <p className="m-justify">
              {post.node.excerpt}
              <br />
              <br />
            </p>
            <div>
              <Link className="button" to={post.node.fields.slug}>
                Keep Reading →
    </Link>
            </div>
          </article>
        </div>
      )
    })}
  </div> )

}

const style = {
  "vh": "10%",
  "color": "red"
}

FeatureGrid.propTypes = {
  edges: PropTypes.array
}

export default FeatureGrid
