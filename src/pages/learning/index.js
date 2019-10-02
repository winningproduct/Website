import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/learningflat.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              color: 'black',
              padding: '1rem',
            }}
          >
          Learnings
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
