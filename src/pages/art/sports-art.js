import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const SportsArtPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const seo_description = "Illustrates the Sports Art offered for sale on iArtX.com, including works by the artists Blake Jamieson and Efdot."

  return (
    <Layout>
      <Seo title="Sports Art - The Jamieson Collection" description={seo_description} />
      <div className="container page-container">
        <h1>Sports Art - Available Works</h1>

        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(painting => {
              return <div key={painting.slug}>
                {painting.images && <CardImageCaptionLink item={painting} caption_format="Gallery" />}
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
        subgenres: {elemMatch: {slug: {eq: "sports-art"}}},
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
          aka
        }
        title
        images {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        price
        subgenres {
          slug
        }
        slug
      }
    }
  }
`

export default SportsArtPage
