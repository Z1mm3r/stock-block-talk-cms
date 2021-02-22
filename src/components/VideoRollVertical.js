import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import VideoSnippet from './VideoSnippet'
import Divider from './Divider'

class VideoRollVertical extends React.Component {

    render() {
        const { data,
            currentId,
        } = this.props
        const { edges: posts } = data.allMarkdownRemark
        console.log(this.props)
        console.log(currentId)
        console.log(posts)

        const videos = posts.filter(({node:post}) => post.id != currentId).slice(0,3)

        return (
        <div className="columns is-multiline vertical-roll-container">
            <div>
                <h4 className={"vertical-roll-header"}>Most Recent Videos</h4>
            </div>
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
  currentId: PropTypes.string,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (currentId) => (
  <StaticQuery
    query={graphql`
      query VideoRollVerticalQuery{
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 4
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
    render={(data, count) => <VideoRollVertical currentId={currentId.currentId} data={data} count={count} />}
  />
)