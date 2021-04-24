import React from "react"
import { graphql } from "gatsby"

import { MDBCard, MDBCardBody } from "mdbreact"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const AuthorsPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <Seo title="Authors" />
      <div className="container page-container">
        <h1>Authors</h1>
        <MDBCard>
          <MDBCardBody>
            <div>
              <h2 className='mt-1 text-center'>Coming soon...</h2>
            </div>
          </MDBCardBody>
        </MDBCard>
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
