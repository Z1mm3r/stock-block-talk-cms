import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import VideoPlayer from '../components/VideoPlayer'
import VideoRollVertical from '../components/VideoRollVertical'

export const VideoPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  videoSource,
}) => {
  const PostContent = contentComponent || CountQueuingStrategy

  return (
    <section className="section article-body">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-7 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div className="video-post-video-container">
              <VideoPlayer src={videoSource} />
            </div>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="column is-3 is-offset-1 ">
            <VideoRollVertical/>
          </div>
        </div>
      </div>
    </section>
  )
}

VideoPostTemplate.propTypes = {
  postID: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  videoSource: PropTypes.string,
}

const VideoPost = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <VideoPostTemplate
        postID={post.id}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        videoSource={post.frontmatter.video_src}
      />
    </Layout>
  )
}

VideoPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default VideoPost

export const pageQuery = graphql`
  query PostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        video_src
      }
    }
  }
`
