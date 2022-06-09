import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import { MDBContainer } from "mdb-react-ui-kit";

import Layout from "../components/layout"
import Seo from "../components/seo"

import ArtistInfo from "../components/artist-info"
import CardImageCaptionLink from "../components/card-image-caption-link"

import { getCreatorFullName } from "../utils/creator"

const ArtistPage = ({data}) => {
  const {
    strapiArtist: artist,
    allStrapiPainting: { nodes: paintings },
    allStrapiTradingcard: { nodes: cards }
  } = data
  //console.log("artist.js data", data)

  const artistname = getCreatorFullName(artist)

  const pageTitle = `${artistname} - Artist`

  const works = artist.country.name === "Haiti" ? "Haitian Art" : "paintings"

  const seo_description = `Images of and details about ${works} by ${artistname} offered for sale on iArtX.com.`
  //console.log("artist.js seo_description", seo_description)

  return (
    <Layout>
      <Seo title={pageTitle} description={seo_description} />
      <div className="container page-container">
        <h1 className="page-head">{pageTitle}</h1>
        <section className="artists">
          <MDBContainer>
            <article className="content-container gallery">

              <ArtistInfo artist={artist} />

              { (artist.image[0] && artist.image[0].url) &&
                <div className="image-container">
                  <img className="img-fluid card" src={artist.image[0].url} alt="Portrait of the artist" />
                  { (artist.imagecredit) &&
                    <em><p className="img-credit">{artist.imagecredit}</p></em>
                  }
                </div>
              }

              <div className="bio">
                { artist.bio && <ReactMarkdown source={artist.bio} /> }
                { artist.biocredit && <em><p className="bio-credit">{artist.biocredit}</p></em> }
              </div>

              <h3>Available Art Works:</h3>

              <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                {paintings.map((painting) => {
                  return (
                   <div key={painting.id}>
                    {painting.images && <CardImageCaptionLink item={painting} caption_format="Artist" /> }
                  </div>
                  )
                })}
              </div>

              { (cards.length > 0) && <>
                <h3>Available Cards:</h3>

                <div className="uk-grid-small uk-child-width-1-3@s uk-child-width-1-4@m" uk-grid="masonry: true">
                  {cards.map((card) => {
                    return (
                       <div key={card.id}>
                        {card.images && <CardImageCaptionLink item={card} caption_format="Series" /> }
                      </div>
                    )
                  })}
                </div></>
              }

              { artist.publications &&
                <>
                  <h3>Selected Publications:</h3>
                  <div className="bio">
                      <ReactMarkdown source={artist.publications} />
                  </div>
                </>
              }
            </article>
          </MDBContainer>

        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
query GetArtistAndWorks($slug: String) {
  strapiArtist(slug: {eq: $slug}) {
    lastname
    firstname
    aka
    country {
      name
    }
    birth
    death
    image {
      url
    }
    imagecredit
    bio
    biocredit
    publications
  },
  allStrapiPainting(
    filter: {
      artist: {slug: {eq: $slug}},
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
      price
      slug
    }
  },
  allStrapiTradingcard(
    filter: {
      artist: {slug: {eq: $slug}},
      qty: {gt: 0}
    },
    sort: { fields: player___name, order: ASC }
  ) {
    nodes {
      id: strapiId
      sku
      artist {
        firstname
        lastname
      }
      cardseries {
        name
      }
      title
      subtitle
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
      price
      slug
    }
  }
}
`

export default ArtistPage
