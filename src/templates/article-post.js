import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ArticlePostTemplate = ({
  content,
  contentComponent,
  description,
  featuredImage,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-7 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light article-title has-text-centered">
              {title}
            </h1>
            <div className="has-text-centered">
              <p >{description}</p>
              <br/>
            </div>
            {featuredImage ? 
               <PreviewCompatibleImage
               imageInfo={{
                 image: featuredImage,
                 alt: `featured image thumbnail for post ${title}`,
               }}
             />
             : null
            }
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
        </div>
      </div>
    </section>
  )
}

ArticlePostTemplate.propTypes = {
  featuredImage: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.oneOfType([ 
        PropTypes.shape({}),
        PropTypes.arrayOf(PropTypes.shape({})),          
       ]),
     }),
  }),
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ArticlePost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ArticlePostTemplate
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
        featuredImage={post.frontmatter.featuredimage}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

ArticlePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ArticlePost

export const pageQuery = graphql`
  query ArticlePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
