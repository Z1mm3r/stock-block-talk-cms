import * as React from 'react'

import Layout from '../components/Layout'
import BlogRollV2 from '../components/BlogRollV2'
import VideoRollVertical from '../components/VideoRollVertical'
import { Link } from "gatsby"

const VideoListTemplate = (props ) => {
    const {data} = {...props}
    const {videos} = {...data}
    console.log(videos)
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
              backgroundColor: '#f40',
              color: 'white',
              padding: '1rem',
            }}
          >
            Latest Videos
          </h1>
        </div>
        <section className="section">
          <div className="container sub-index-content">
            <div className="content">
              {/* <BlogRollV2 data={data} /> */}
              <VideoRollVertical data={videos} noDivider noRaise/>
            </div>
            <div className="pagination-container">
                {props.pageContext.previousPagePath ? <Link to={props.pageContext.previousPagePath}>Previous Videos</Link> : null}
                {props.pageContext.nextPagePath ? <Link to={props.pageContext.nextPagePath}>More Videos</Link> : null}
            </div>
          </div>
        </section>
      </Layout>
    )
}



  
  export const pageQuery = graphql`
        query ($skip: Int!, $limit: Int!) {
          videos: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            skip: $skip
            limit: $limit 
            filter: { frontmatter: { templateKey: { eq: "video-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 200)
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
      `

export default VideoListTemplate