import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import axios from 'axios';


export const BlogPostTemplate = ({
  content,
  contentComponent,
  author,
  slug,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  console.log(slug.split('/')[2])
 // axios.get().then(res=>console.log(res.data))
 //http://api.github.com/repos/:owner/:repo/commits?path=PATH_TO_FILE
 //https://api.github.com/repos/izuzak/pmrpc/commits?path=README.markdown
 
 let url = 'https://api.github.com/repos/WPOcanvas/Model/commits?path=blogs/'+slug.split('/')[2]+'.md'

    // let url = 'https://api.github.com/repos/WPOcanvas/Model/commits?path=blogs/happy-architecture-creating-a-culture.md'

   axios.get(url, { headers: { "Accept": "application/vnd.github.cloak-preview"} }).then(res=>
    console.log(res.data)
  )
 
 
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light m-capitalize">
              {title.replace(/[0-9]*-/g, '')}
            </h1>
            <PostContent content={content} />
            <br />
            <p>Author : {author}</p>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  author: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        author={post.frontmatter.author}
        slug={post.fields.slug}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        author
      }
      fields {
        slug
      }
    }
  },
`
