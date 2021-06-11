import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const ModernLitPage = ({ data }) => {
  const {
    allStrapiBook: { nodes: books },
  } = data

  const seo_description = "Images of Modern Literature first edition books offered for sale on iArtX.com, with links to details about each title."

  return (
    <Layout>
      <Seo title="Modern Literature - The Jamieson Collection" description={seo_description} />
      <div className="container page-container">
        <h1>Modern Literature - Available Books</h1>

        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {books.map(book => {
              return <div key={book.slug}>
                {book.images && <CardImageCaptionLink item={book} caption_format="Books" />}
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
    allStrapiBook(
      filter: {
        subgenres: {elemMatch: {slug: {eq: "modern-literature"}}},
        qty: {gt: 0}
      },
      sort: {
        fields: order, order: ASC
      }
    ) {
      nodes {
        id: strapiId
        sku
        authors {
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

export default ModernLitPage
