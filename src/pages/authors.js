import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CardImageCaptionLink from "../components/card-image-caption-link"

const AuthorsPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <SEO title="Artists" />
      <div className="container page-container">
        <h1>Artists</h1>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(book => {
              return <div key={book.identifier}>
                {book.image && <CardImageCaptionLink item={book} caption_format="Author" /> }
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

export default AuthorsPage
