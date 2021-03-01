import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
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

// export default ({currentId,start,count}) => (
//   <StaticQuery
//     query={graphql`
//       query VideoRollVerticalQuery{
//         allMarkdownRemark(
//           sort: { order: DESC, fields: [frontmatter___date] }
//           limit: 4
//           filter: { frontmatter: { templateKey: { eq: "video-post" } } }
//         ) {
//           edges {
//             node {
//               excerpt(pruneLength: 400)
//               id
//               fields {
//                 slug
//               }
//               frontmatter {
//                 title
//                 video_src
//                 templateKey
//                 date(formatString: "MMMM DD, YYYY")
//                 featuredpost
//                 featuredimage {
//                   childImageSharp {
//                     fluid(maxWidth: 120, quality: 100) {
//                       ...GatsbyImageSharpFluid
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={(data, count) => <VideoRollVertical currentId={currentId} data={data} start={start} count={count} />}
//   />
// )