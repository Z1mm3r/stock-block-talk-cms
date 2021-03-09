import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'


// Blog Roll that is used for paginated pages. Pulls in data from Passed down props instead of
//its own staticQuery
class BlogRollV2 extends React.Component {

  filterExcludedID = (excludedID,data) =>{
    return data.filter((post)=> post.id != excludedID)
  }

  render() {

    const {
      articles,
      data,
      excludedID,
      noExcerpt,
      perRow = 2,
    } = this.props

    const size = Math.floor(12/perRow)
    let { edges: posts } =  data ? data.allMarkdownRemark : articles ? articles : null
    posts = excludedID ? (this.filterExcludedID(excludedID,posts)) : posts
    
    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className={`is-parent column is-${size} snippet-container`} key={post.id}>
              <article
                className={`blog-list-item black-border-thin tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  {!noExcerpt ? post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.date}
                    </span>
                  </p>
                </header>
                {noExcerpt ? (
                  <div className="featured-thumbnail">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                    }}
                  />
                </div>
                ) : null}
                <p>
                  {!noExcerpt ? post.excerpt : null}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

BlogRollV2.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default BlogRollV2