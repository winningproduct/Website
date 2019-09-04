import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ModelRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    let indexing = []
    let checkList = []
    let completeCheckList = []

    posts.map(({ node: post }) => {
      let ob = {
        id: post.frontmatter.indexingField.split('-')[0],
        name: post.frontmatter.indexingField.split('-')[1]
      }
      return indexing[ob.id - 1] = ob;
    })

    indexing.forEach(index => {
      checkList = []
      posts.map(({ node: post }) => {
        if (post.frontmatter.indexingField.split('-')[1] === index.name) {
          let content = {
            id: post.frontmatter.title.split('-')[0],
            name: post.frontmatter.title.split('-')[1]
          }
          checkList[content.id - 1] = post
        }
        return false
      })
      return completeCheckList.push(checkList)
    }
    )

    return (
      <div>
        {
          completeCheckList.map((index, i) => {
            return (
              <div key={i}>
                <h2>{indexing[i].name}</h2>
                <div className="column is-multilined m-main">
                  {
                    index.map(post => {
                      return (
                        <div className="column is-4 m-subArticle" key={post.id}>
                          <article
                            className={`blog-list-item tile is-child box notification m-article ${
                              post.frontmatter.featuredpost ? 'is-featured' : ''
                              }`}
                          >
                            <header>
                              {post.frontmatter.featuredimage ? (
                                <div className="featured-thumbnail">
                                  <PreviewCompatibleImage
                                    imageInfo={{
                                      image: post.frontmatter.featuredimage,
                                      alt: `featured image thumbnail for post ${
                                        post.title
                                        }`,
                                    }}
                                  />
                                </div>
                              ) : null}
                              <p className="post-meta">
                                <Link
                                  className="title has-text-primary is-size-4"
                                  to={post.fields.slug}
                                >
                                  {post.frontmatter.title.replace(/[0-9]*-/g, '')}
                                </Link>
                                <span> &bull; </span>
                                <span className="subtitle is-size-5 is-block">
                                  {post.frontmatter.date}
                                </span>
                              </p>
                            </header>
                            <p className="m-justify">
                              {post.excerpt}
                              <br />
                              <br />
                            </p>
                            <div>
                              <Link className="button" to={post.fields.slug}>
                                Keep Reading →
                    </Link>
                            </div>
                          </article>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

ModelRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ModelRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "model-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                indexingField
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ModelRoll data={data} count={count} />}
  />
)
