import React, { useState } from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import { MDBContainer } from "mdbreact";

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArtistInfo from "../components/artist-info"
import CardImageCaptionLink from "../components/card-image-caption-link"

const ArtistsPage = ({ location, data }) => {
  const {
    allStrapiArtist: { nodes: artists },
    allStrapiPainting: { nodes: paintings },
  } = data

  // If passed an artist, open to that artist. Otherwise open first artist on list.
  const [ndx, setNdx] = useState(location.state && location.state.artist ?
    artists.findIndex(a => a.lastname === location.state.artist.lastname && a.firstname === location.state.artist.firstname) : 0)

  return (
    <Layout>
      <SEO title="Artists" />
      <div className="container page-container">
        <h1 className="page-head">Artists - {artists[ndx].firstname} {artists[ndx].lastname} {artists[ndx].aka ? `(aka ${artists[ndx].aka})` : ``}</h1>
        <section className="artists">

          <div className="btn-container">
            <hr/>
            {artists.map((artist, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === ndx && "active-btn"}`} onClick={() => setNdx(index)}>{artist.lastname}, {artist.firstname}</button>
                </div>
              )
            })}
          </div>

          <MDBContainer>
            <article className="content-container gallery">

              <ArtistInfo artist={artists[ndx]} />

              { (artists[ndx].image[0] && artists[ndx].image[0].url) &&
                <div className="image-container">
                  <img className="img-fluid card" src={artists[ndx].image[0].url} alt="Portrait of the artist" />
                  { (artists[ndx].imagecredit) &&
                    <em><p className="img-credit">{artists[ndx].imagecredit}</p></em>
                  }
                </div>
              }

              <div className="bio">
                { artists[ndx].bio && <ReactMarkdown source={artists[ndx].bio} /> }
                { artists[ndx].biocredit && <em><p className="bio-credit">{artists[ndx].biocredit}</p></em> }
              </div>

              <h3>Available Works</h3>

              <div className="uk-grid-small uk-child-width-1-1@s uk-child-width-1-2@m" uk-grid="masonry: true">
                {paintings.map((painting) => {
                  return (
                    painting.artist && painting.artist.lastname === artists[ndx].lastname ?
                     <div key={painting.id}>
                      {painting.images && <CardImageCaptionLink item={painting} caption_format="Artist" /> }
                    </div>
                    : null
                  )
                })}
              </div>
            </article>
          </MDBContainer>

        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiArtist(
      limit: 100,
      sort: { order: ASC, fields: lastname }
    ) {
      nodes {
        lastname
        firstname
        aka
        birth
        death
        image {
          url
        }
        imagecredit
        bio
        biocredit
        country {
          name
        }
      }
    },
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
        price
        slug
      }
    }
  }
`

export default ArtistsPage
