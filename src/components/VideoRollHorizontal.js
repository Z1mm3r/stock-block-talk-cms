import React from 'react'
import PropTypes from 'prop-types'
import VideoSnippet from './VideoSnippet'

export default class VideoRollHorizontal extends React.Component {
    render() {
        const {
            data,
            currentId,
            start = 0,
            count = 4,
            smallPadding
        } = this.props

        const { edges: posts } = data
        const videos =  currentId ? posts.filter(({node:post}) => post.id != currentId).slice(start,start + count) : posts.slice(start,start + count)
        const size = Math.floor(12 / count)
        return (
            <div className="columns tile is-ancestor horizontal-roll-container-content">
                {videos && videos.map(({ node: post }) => (
                    <div className={`tile column is-${size} ${smallPadding ? "smallPadding": ''}`} >
                        <VideoSnippet data= {post} />
                    </div>
                ))}
            </div>
        )
    }
}

VideoRollHorizontal.propTypes = {
    start: PropTypes.number,
    count: PropTypes.number,
    smallPadding: PropTypes.bool,
    currentId: PropTypes.string,
    data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
    }),
    }),
}