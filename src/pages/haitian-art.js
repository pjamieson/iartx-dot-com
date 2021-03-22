import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CardImageLinkTitle from "../components/card-image-link-title"

const HaitianArtPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <SEO title="Haitian Art" />
      <div className="container page-container">
        <h1>Haitian Art</h1>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(card => {
              return <div key={card.identifier}>
                {card.image && <CardImageLinkTitle card={card} /> }
              </div>
            })}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiPainting(
      filter: {
        qty: {gt: 0}
      },
      sort: {
        fields: order, order: ASC
      }
    ) {
      nodes {
        id: strapiId
        sku
        artist {
          firstname
          lastname
        }
        title
        subtitle
        price
        images {
          url
          localFile {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        slug
        qty
      }
    }
  }
`

export default HaitianArtPage
