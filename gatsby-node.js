exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
    query GetAvailableItems {
      artists: allStrapiArtist {
        nodes {
          slug
        }
      },
      paintings: allStrapiPainting {
        nodes {
          artist {
            slug
          }
          subgenres {
            slug
          }
          qty
          slug
        }
      },
      tradingcards: allStrapiTradingcard {
        nodes {
          artist {
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
  const artists = result.data.artists.nodes;
  const paintings = result.data.paintings.nodes;
  const tradingcards = result.data.tradingcards.nodes;

  // Create artist pages.
  artists.forEach((artist) => {
    createPage({
      path: `/artists/${artist.slug}/`,
      component: path.resolve(`./src/templates/artist.js`),
      context: {
        slug: artist.slug,
      },
    })
  })

  // Create painting detail pages.
  paintings.forEach((painting) => {
    createPage({
      path: `/gallery/${painting.slug}/`,
      component: path.resolve(`./src/templates/painting.js`),
      context: {
        slug: painting.slug,
      },
    })
  })

  // Create tradingcard detail pages.
  tradingcards.forEach((tradingcard) => {
    createPage({
      path: `/cards/${tradingcard.slug}/`,
      component: path.resolve(`./src/templates/tradingcard.js`),
      context: {
        slug: tradingcard.slug,
      },
    })
  })

}
/*
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

   if (node.internal.type !== null && (node.internal.type === "StrapiPainting")) {
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
*/
