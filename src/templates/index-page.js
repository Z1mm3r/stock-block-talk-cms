import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRollV2 from '../components/BlogRollV2'
import VideoRollHorizontal from '../components/VideoRollHorizontal'

export const IndexPageTemplate = ({
  articles,
  image,
  title,
  heading,
  subheading,
  description,
  videos,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              '#54bec7 0.5rem 0px 0px, #54bec7 -0.5rem 0px 0px',
            backgroundColor: '#54bec7',
            color: 'black',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              '#54bec7 0.5rem 0px 0px, #54bec7 -0.5rem 0px 0px',
            backgroundColor: '#54bec7',
            color: 'black',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              
              <div className="columns content">
                {/* <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div> */}
                <div className="column is-6 index-content">
                  <h3 className="has-text-weight-semibold is-size-2 has-text-centered">
                    Latest stories
                  </h3>
                  <div className="column-body"> 
                    <BlogRollV2 articles={articles} perRow={1} /> 
                  </div>
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/articles">
                      Read more
                    </Link>
                  </div>
                </div>

                <div className="column is-6 index-content ">
                  <h3 className="has-text-weight-semibold is-size-2 has-text-centered">
                    Latest Videos
                  </h3>
                  <div className="column-body">
                    <VideoRollHorizontal data={videos} count={2} smallPadding/>
                    <VideoRollHorizontal data={videos} count={2} start={2} smallPadding/>
                    <VideoRollHorizontal data={videos} count={2} start={4} smallPadding/>
                  </div>
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/articles">
                      Watch more
                    </Link>
                  </div>
                </div>
                
                {/* <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  articles: PropTypes.array,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  videos: PropTypes.array,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <IndexPageTemplate
        articles={ data.articles }
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        videos={ data.videos }
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    articles: PropTypes.array,
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    videos: PropTypes.array,
  }),
}

export default IndexPage

export const pageQuery = graphql`

  query IndexPageTemplate {
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 2
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

    videos: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 6
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

    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
      }
    }
  }
`
