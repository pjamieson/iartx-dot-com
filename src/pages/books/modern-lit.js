import React from "react"
import { graphql } from "gatsby"

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

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

        { books.length === 0 &&
          <MDBCard>
            <MDBCardBody>
              <div>
                <h2 className='mt-1 text-center'>More titles coming soon...</h2>
              </div>
            </MDBCardBody>
          </MDBCard>
        }
        { books.length > 0 &&
          <section className="gallery">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
              {books.map(book => {
                return <div key={book.slug}>
                  {book.images && <CardImageCaptionLink item={book} caption_format="Books" />}
                </div>
              })}
            </div>
          </section>
        }

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
        qty
      }
    }
  }
`

export default ModernLitPage
