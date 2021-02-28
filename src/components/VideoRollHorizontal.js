import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import VideoSnippet from './VideoSnippet'

//Notes... 
//Currently this and VideoRollVertical do the querys within their respective components.
//Because of this the static components cannot change the max size to work with.
//TODO remove queries from VideoRollHorizontal, VideoRollVertical.
// THEN add the information retrieval to the page components and pass down the data in props.
// [ ]index-page
// [ ]video-post

class VideoRollVertical extends React.Component {

    render() {
        const { data,
            currentId,
            start = 0,
            count = 4,
        } = this.props

        const { edges: posts } = data.allMarkdownRemark
        const videos =  currentId ? posts.filter(({node:post}) => post.id != currentId).slice(start,start + count) : posts.slice(start,start + count)
        const size = Math.floor(12 / count)
        return (
            <div className="columns horizontal-roll-container-content">
                {videos && videos.map(({ node: post }) => (
                    <div className={`column is-${size}`} >
                        <VideoSnippet data= {post} />
                    </div>
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

export default ({currentId,start,count}) => (
  <StaticQuery
    query={graphql`
      query VideoRollHorizontalQuery{
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 5
          filter: { frontmatter: { templateKey: { eq: "video-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                video_src
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <VideoRollVertical currentId={currentId} data={data} count={count} start={start} />}
  />
  )