import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import { Link } from "gatsby";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/learningflat.jpg')`
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              color: "black",
              padding: "1rem"
            }}
          >
            Learnings and Certification
          </h1>
        </div>

        <section className="section">
          <div className="container">
            <div className="content">
              <section className="section section--gradient">
                <div className="container">
                  <div className="columns">
                    <div className="column is-10 is-offset-1">
                      <div className="section">
                        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                          What is Certification and why?
                        </h2>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum
                        <br />
                        <br />
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

       
        <section className="sectioncourse">
          <div className="container">
            <div className="content"> 

            <div style={{display : 'flex'}}>         
            <div className="is-parent column is-4 m-subArticle">
                  <article className="blog-list-item tile is-child box notification m-article is-featured">
                    <header>
                      <div className="featured-thumbnail"></div>

                      <p className="post-meta">
                        {/* <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link> */}

                        <span className="subtitle is-size-5 is-block">
                          Associate
                        </span>
                        <Link to="/learning/associate">Read More</Link>
                      </p>
                    </header>
                  </article>
                  </div>

                  <div className="is-parent column is-4 m-subArticle">
                  <article className="blog-list-item tile is-child box notification m-article is-featured">
                    <header>
                      <div className="featured-thumbnail"></div>

                      <p className="post-meta">
                        {/* <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link> */}

                        <span className="subtitle is-size-5 is-block">
                          Proffesional
                        </span>
                        <Link to="/learning/proffesional">Read More</Link>
                      </p>
                    </header>
                  </article>
                  </div>

                  <div className="is-parent column is-4 m-subArticle">
                  <article className="blog-list-item tile is-child box notification m-article is-featured">
                    <header>
                      <div className="featured-thumbnail"></div>

                      <p className="post-meta">
                        {/* <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link> */}

                        <span className="subtitle is-size-5 is-block">
                          Guru
                        </span>
                        <Link to="/learning/guru">Read More</Link>
                      </p>
                    </header>
                  </article>
                  </div>
                    </div>
             
            </div>
          </div>

        </section>
         
        
      </Layout>
    );
  }
}
