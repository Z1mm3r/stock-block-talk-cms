import React from 'react'
import PropTypes from 'prop-types'
import VideoSnippet from './VideoSnippet'
import Divider from './Divider'

export default class VideoRollVertical extends React.Component {

    render() {
        const { data,
            currentId,
        } = this.props
        const { edges: posts } = data

        const videos = posts.filter(({node:post}) => post.id != currentId).slice(0,3)

        return (
        <div className="columns is-multiline vertical-roll-container">
            {videos &&
            videos.map(({ node: post }) => (
                <>
                    <Divider/>
                    <VideoSnippet data= {post} />
                </>
            ))}
        </div>
        )
    }
}

VideoRollVertical.propTypes = {
  start: PropTypes.number,
  count: PropTypes.number,
  currentId: PropTypes.string,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}
