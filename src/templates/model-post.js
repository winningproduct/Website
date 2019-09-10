import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import axios from 'axios';

export const ModelPostTemplate = ({
  content,
  contentComponent,
  description,
  slug,
  tags,
  title,
  helmet,
}) => {
 const PostContent = contentComponent || Content

 //use state for keep authors
 const [authors,setAuthors]=useState([]);
 let commiters = [];
  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repos/WPOcanvas/Model/commits?path="+slug.split('/')[1]+'/'+slug.split('/')[2]+'/'+slug.split('/')[3]+'.md'
      )
      .then(({ data }) => {
   
      data.map( item => {
        commiters.push({name:item.author.login,url:item.author.url});

      })

      function getUnique(arr, comp) {

        const unique = arr
             .map(e => e[comp])
      
           // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
      
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);
      
         return unique;
      }

      setAuthors(getUnique(commiters,'name'))
     

      //avoid duplications
      
      // setAuthors(commiters.filter(function(item, pos) {
      //   return commiters.indexOf(item) == pos;
      //  }));
      
      });
  }, []);

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
            {authors.map(author => <div>{author.name}</div>)}
            {authors.map(author => <div>{author.url}</div>)}
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link className="btn" style={style.btn} to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
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

const style = {
  btn: {
    "boxShadow": "0 0 8px 1px #5a565566",
    "color": "#a7a19f"
  }
}

ModelPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  // why: PropTypes.string,
  // what: PropTypes.string,
  // how: PropTypes.string
}

const ModelPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ModelPostTemplate
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
        slug={post.fields.slug}
        // why={post.frontmatter.why}
        // what={post.frontmatter.what}
        // how={post.frontmatter.how}
      />
    </Layout>
  )
}

ModelPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ModelPost

export const pageQuery = graphql`
  query ModelPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
      fields {
        slug
      }
    }
  }
`
