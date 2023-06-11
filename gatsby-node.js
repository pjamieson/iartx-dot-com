const redirects = require("./redirects.json")
exports.createPages = async ({ graphql, actions }) => {

  const { createRedirect } = actions
	createRedirect({
	    fromPath: "/typewriters/gossen-typewriter/",
	    toPath: "https://ultraportabletypewriters.com/gossen-tippa/",
			statusCode: 200,
	    isPermanent: true
	})
	redirects.forEach(redirect =>
		createRedirect({
	    fromPath: redirect.fromPath,
	    toPath: redirect.toPath,
      isPermanent: redirect.isPermanent,
	  })
	)

  const { createPage } = actions
  const result = await graphql(
    `
    query GetAvailableItems {
      artists: allStrapiArtist {
        nodes {
          slug
        }
      },
      authors: allStrapiAuthor {
        nodes {
          slug
        }
      },
      paintings: allStrapiPainting {
        nodes {
          artist {
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
      },
      books: allStrapiBook {
        nodes {
          authors {
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
  const authors = result.data.authors.nodes;
  const paintings = result.data.paintings.nodes;
  const tradingcards = result.data.tradingcards.nodes;
  const books = result.data.books.nodes;

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

  // Create author pages.
  authors.forEach((author) => {
    createPage({
      path: `/authors/${author.slug}/`,
      component: path.resolve(`./src/templates/author.js`),
      context: {
        slug: author.slug,
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

  // Create book detail pages.
  books.forEach((book) => {
    createPage({
      path: `/books/${book.slug}/`,
      component: path.resolve(`./src/templates/book.js`),
      context: {
        slug: book.slug,
      },
    })
  })

}
