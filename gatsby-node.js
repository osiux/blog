const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const filepath = createFilePath({
      node,
      getNode,
      basePath: 'posts',
      trailingSlash: false,
    })
    const [prefix, slug] = filepath.split('--')
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `prefix`,
      value: prefix,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}
