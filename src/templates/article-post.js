import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import BlogRollV2 from '../components/BlogRollV2';

export const ArticlePostTemplate = ({
  content,
  contentComponent,
  date,
  description,
  featuredImage,
  id,
  helmet,
  reccomendedArticles,
  tags,
  title,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-2 side-ad-contianer">
          </div>
          <div className="column is-7 ">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light article-title has-text-centered">
              {title}
            </h1>
            <div className="has-text-centered">
              <h2 className="article-subtext">{description}</h2>
              <div>
               <p>
                 Posted: {date}
               </p>
               <br/>
              </div>
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
            <PostContent content={content} date={date} />
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
          <div className="column is-3">
            <div className="recommended-articles-container">
              <div className="recommended-articles-header">
                <p>You May Also Like</p>
              </div>
                <BlogRollV2 articles={reccomendedArticles} excludedID={id} perRow={1} noExcerpt>

                </BlogRollV2>
            </div>
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
  const { articles: reccomendedArticles} = data

  return (
    <Layout>
      <ArticlePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        date={post.frontmatter.date}
        description={post.frontmatter.description}
        featuredImage={post.frontmatter.featuredimage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta property="og:title" content={post.frontmatter.title} />

          </Helmet>
        }
        id={post.id}
        reccomendedArticles={reccomendedArticles}
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
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      filter: { frontmatter: { templateKey: { eq: "article-post" } } }
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
            templateKey
            date(formatString: "MMMM DD, YYYY")
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
