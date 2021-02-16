import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import VideoSnippet from './VideoSnippet'
import Divider from './Divider'

class VideoRollVertical extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <div className="columns is-multiline vertical-roll-container">
        <div>
            <p>Top Videos</p>
        </div>
        <br/>
        {posts &&
          posts.map(({ node: post }) => (
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
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query VideoRollVerticalQuery($limit: Int) {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: $limit
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
    render={(data, count) => <VideoRollVertical data={data} count={count} />}
  />
)