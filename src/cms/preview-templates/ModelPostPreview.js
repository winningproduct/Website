import React from 'react'
import PropTypes from 'prop-types'
import { ModelPostTemplate } from '../../templates/model-post'

const ModelPostPreview = ({ entry, widgetFor }) => (
  <ModelPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

ModelPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ModelPostPreview