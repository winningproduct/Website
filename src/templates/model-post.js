import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import ExampleComponent from "react-rounded-image";
import axios from 'axios';

export const ModelPostTemplate = ({
  content,
  contentComponent,
  description,
  type,
  slug,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  //use state for keep authors
  const [authors, setAuthors] = useState([]);
  let commiters = [];
  useEffect(() => {
    //API call for getting commits for the particular model post
    axios
      .get(
        "https://api.github.com/repos/WPOcanvas/Model/commits?path=" + slug.split('/')[1] + '/' + slug.split('/')[2] + '/' + slug.split('/')[3] + '.md'
      )
      .then(({ data }) => {
        data.map(item => {
         return commiters.push({ name: item.author.login, url: item.author.html_url, img: item.author.avatar_url, date: item.commit.author.date});

        })

        // get unique author by commits
        function getUnique(arr, comp) {
          const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
          return unique;
        }
            //setAuthors(commiters)
          setAuthors(getUnique(commiters, 'name'))

      });
  },[]);
  
 
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light m-capitalize">
              {title.replace(/[0-9]*-/g, '')}
            </h1>
            <h6>
              {type}
            </h6>
            <PostContent content={content} />
            <br/>

            <h4>Contributors</h4>
            <div class="topContainer">
              {authors.map(author => <div class="contributorCards">


                <a href={author.url} target="_blank" rel="noopener noreferrer">
                  <div class="roundedImage">
                  <ExampleComponent
                    image={author.img}
                    roundedSize="0"
                    imageWidth="60"
                    imageHeight="60"
                    href="#"
                  />
                  </div>
            
                </a>
                <br/>
                {author.name}
                <br/>
                {author.date.split("T")[0]}
               
               

              </div>)}

            </div>


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
  type: PropTypes.string,
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
        type={post.frontmatter.type}
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
        type
        description
        tags
      }
      fields {
        slug
      }
    }
  }
`
