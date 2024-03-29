import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Jumbotron from "../components/jumbotron"
import FeaturedImagelink from "../components/featured-image-link"

import blake from "../images/blake-clememte.jpg"

const IndexPage = ({data}) => {
  const {
    //allStrapiTradingcard: { nodes: tradingcards },
    //allStrapiProduct: { nodes: products },
    allStrapiPainting: { nodes: paintings },
  } = data
  //console.log("index.js paintings", paintings)
  return (
    <Layout>
      <Seo title="Home - The Jamieson Collection" />
      <div className="container site-container">
        <Jumbotron />
        <div className="container front-content">

        <section className="intro-content">
          <div className="image-container">
            <img className="card" src={blake} alt="Roberto Clemente baseball card" />
          </div>
          <h2>A Curated Selection of Collectables</h2>
          <h3>Featuring Haitian Art, Vintage Typewriters, and West Indian Literature</h3>
          <p className="dark-grey-text">
            Every item offered here currently hangs or is shelved in the Northern California home of Rebecca and Patrick Jamieson.
          </p>
          <p className="dark-grey-text">
            Unfortunately, space in our home is limited. That's where selling from our collection comes in: While each sale forces us to part with a collectable we love, it also offers us the opportunity to adopt another.
          </p>
          <ul>
            <li>We're happy to answer questions and provide additional images.</li>
            <li>We pack well and ship promptly upon clearance of payment.</li>
            <li>Satisfaction guaranteed with returns accepted for any reason.</li>
          </ul>
          <p className="dark-grey-text">
            Scroll down for a quick look at representative examples of available typewriters, art works, books and trading cards. Tap or click on an image to go directly to the Gallery Page that describes that item in detail.
          </p>
          <p className="dark-grey-text">
            Explore the menu links above for a more granular breakdown of available items, with each linked page offering more examples.
          </p>
          <h4>Check back often.</h4>
          <h4>We frequently update our offerings.</h4>
        </section>

        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid="masonry: true">
            {paintings.map(painting => {
              return <div key={painting.slug}>
                {painting.images && <FeaturedImagelink item={painting} />}
              </div>
            })}
          </div>
        </section>

      </div>
    </div>
  </Layout>
  )
}

export const query = graphql`
  {
    allStrapiPainting(
      filter: {
        feature: {eq: true}
      },
      sort: {
        fields: order, order: ASC
      }
    ) {
      nodes {
        artist {
          firstname
          lastname
          aka
        }
        images {
          formats {
            large {
              url
            }
            medium {
              url
            }
            small {
              url
            }
            thumbnail {
              url
            }
          }
          height
          width
          url
        }
        slug
        title
      }
    }
  }
`

export default IndexPage

/*

{tradingcards.map(tradingcard => {
  return <div key={tradingcard.identifier}>
    <FeaturedImagelink card={tradingcard} />
  </div>
})}
{products.map(product => {
  return <div key={product.identifier}>
    <FeaturedImagelink card={product} />
  </div>
})}

allStrapiTradingcard(
  filter: {
    feature: {eq: true}
  }
) {
  nodes {
    identifier
    project_2020_player {
      name
    }
    topps_1951_player {
      name
    }
    project_70_player {
      name
    }
    images {
      formats {
        large {
          url
        }
        medium {
          url
        }
        small {
          url
        }
        thumbnail {
          url
        }
      }
      height
      width
      url
    }
  }
},
allStrapiProduct(
  filter: {
    feature: {eq: true}
  }
) {
  nodes {
    identifier
    product_category {
      name
      slug
    }
    images {
      formats {
        large {
          url
        }
        medium {
          url
        }
        small {
          url
        }
        thumbnail {
          url
        }
      }
      height
      width
      url
    }
  }
},
*/
