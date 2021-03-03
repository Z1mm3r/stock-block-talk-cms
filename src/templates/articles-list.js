import * as React from 'react'

import Layout from '../components/Layout'
import BlogRollV2 from '../components/BlogRollV2'
import { Link } from "gatsby"

const ArticlesListTemplate = (props ) => {
    const {data} = {...props}
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/articles-header.jpg')`,
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
            Latest Articles
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRollV2 data={data} />
            </div>
            <div className="pagination-container">
                {props.pageContext.previousPagePath ? <Link to={props.pageContext.previousPagePath}>Previous Articles</Link> : null}
                {props.pageContext.nextPagePath ? <Link to={props.pageContext.nextPagePath}>More Articles</Link> : null}
            </div>
          </div>
        </section>
      </Layout>
    )
}



  
  export const pageQuery = graphql`
        query ($skip: Int!, $limit: Int!) {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            skip: $skip
            limit: $limit 
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

export default ArticlesListTemplate