import React from 'react'
import PropTypes from 'prop-types'
import VideoSnippet from './VideoSnippet'
import Divider from './Divider'

export default class VideoRollVertical extends React.Component {

    render() {
        const { data,
            currentId,
            noDivider = false,
            noRaise = false,
            maxVideos
        } = this.props
        const { edges: posts } = data

        const videos = posts.filter(({node:post}) => post.id != currentId).slice(0,(maxVideos ? maxVideos : posts.count))

        return (
        <div className="columns is-multiline vertical-roll-container">
            {videos &&
            videos.map(({ node: post }) => (
                <>
                    {noDivider ? null : <Divider/> }
                    <VideoSnippet data= {post} noRaise={noRaise}/>
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
  noDivider: PropTypes.bool,
  noRaise: PropTypes.bool,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}
