exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
    query GetAvailableItems {
      paintings: allStrapiPainting {
        nodes {
          subgenres {
            slug
          }
          qty
          slug
        }
      }
    }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const path = require('path')
  const paintings = result.data.paintings.nodes;

  // Create painting detail pages.
  paintings.forEach((painting) => {
    const section = painting.qty > 0 ? '/gallery/' : '/archive/'
    createPage({
      path: `${section}${painting.slug}`,
      component: path.resolve(`./src/templates/painting.js`),
      context: {
        slug: painting.slug,
      },
    })
  })

}

// Need to create a localFile___NODE for content types with multiple images
// See: https://stackoverflow.com/questions/62745591/how-to-query-multiple-images-in-gatsby-from-strapi-using-graphql
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
 }) => {
   const { createNode } = actions;

   let itemImages = node.images

   if (node.internal.type !== null && (node.internal.type === "StrapiProduct" || node.internal.type === "StrapiPainting")) {
     if (itemImages.length > 0) {
       // itemImages.forEach(el => console.log(el))
       const images = await Promise.all(
         itemImages.map(el =>
           createRemoteFileNode({
             url: (el.provider === "local" ? `${process.env.GATSBY_STRAPI_API_URL}${el.url}` : `${el.url}`),
             parentNodeId: node.id,
             store,
             cache,
             createNode,
             createNodeId,
           })
         )
       )

      itemImages.forEach((image, i) => {
        image.localFile___NODE = images[i].id
      })

    }
  }
};
