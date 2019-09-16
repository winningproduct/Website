import React from 'react'

import Layout from '../../components/Layout'
import ModelRoll from '../../components/ModelRoll'

export default class ModelIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/alpine-dawn-dusk-2835436.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              color: 'white',
              padding: '1rem',
            }}
          >
              Canvas Models
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <ModelRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
