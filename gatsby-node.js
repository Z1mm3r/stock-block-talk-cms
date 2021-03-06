const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { paginate } =  require('gatsby-awesome-pagination');

//TODO move this to a const file
const postsPerPageList = 4
const reccomendedVideoCount = 4
const reccomendedArticleCount = 4


exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
      ) 
      {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    let videos = []
    let articles = []
    let otherPages = []
    
    //split videos & articles
    posts.forEach((edge) => {
      switch(edge.node.frontmatter.templateKey){
        case "video-post":
          videos.push(edge)
          break;
        case "article-post":
          articles.push(edge)
          break;
        case "blog-post":
          otherPages.push(edge)
          break;
        default:
          otherPages.push(edge)
          break;
      }
    })

    //Get Our Newest Videos/Articles
    //Useless??
    let newVideos = videos.slice(0,reccomendedVideoCount)
    let newArticles = articles.slice(0,reccomendedArticleCount)

    //Pagination

    paginate({
      createPage,
      items: articles,
      itemsPerPage: postsPerPageList,
      pathPrefix: '/articles',
      component: path.resolve(`src/templates/articles-list.js`)

    })

    paginate({
      createPage,
      items: videos,
      itemsPerPage: postsPerPageList,
      pathPrefix: '/videos',
      component: path.resolve(`src/templates/video-list.js`)

    })

    //Create Our Keys -> Video, Articles, Rest of Site
    videos.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    articles.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    otherPages.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    /* OLD Doing all posts the same time.
    // posts.forEach((edge) => {
    //   const id = edge.node.id
    //   createPage({
    //     path: edge.node.fields.slug,
    //     tags: edge.node.frontmatter.tags,
    //     component: path.resolve(
    //       `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
    //     ),
    //     // additional data can be passed via context
    //     context: {
    //       id,
    //     },
    //   })
    // })
    */
    

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
