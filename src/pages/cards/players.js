import React from "react"
//import { graphql } from "gatsby"

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
//import CardImageCaptionLink from "../../components/card-image-caption-link"

const PlayersPage = ({ data }) => {
  /*const {
    allStrapiPainting: { nodes: paintings },
  } = data*/

  return (
    <Layout>
      <Seo title="Players" />
      <div className="container page-container">
        <h1>Players</h1>
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
/*
export const query = graphql`
  {
    allStrapiPainting(
      filter: {
        qty: {gt: 10}
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
*/
export default PlayersPage
