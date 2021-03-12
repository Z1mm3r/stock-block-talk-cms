import * as React from 'react'

import Layout from '../components/Layout'
import BlogRollV2 from '../components/BlogRollV2'
import { Link } from "gatsby"
import {BgImage} from '../components/BgImage'

const ArticlesListTemplate = (props ) => {
    const {data} = {...props}
    console.log('data',data)
    const { frontmatter }  = data.markdownRemark
    console.log('frontmatter',frontmatter)
    console.log('image-look', frontmatter.image)
    const  image  = frontmatter.image
    console.log('image',image)
    return (
      <Layout>
        <BgImage
          Tag="section"
          className="full-width-image-container margin-top-0"
          fluid={image.childImageSharp.fluid.src}
        >
          <div>
            <p>hello</p>
          </div>
        </BgImage>
        {/* <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
          }}
        > */}
        <div>
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

          markdownRemark(frontmatter: { templateKey: { eq: "articles-list" } }) {
            frontmatter {
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }

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