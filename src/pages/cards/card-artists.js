import React, { useState } from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import { MDBContainer } from "mdbreact";

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import ArtistInfo from "../../components/artist-info"
import CardImageCaptionLink from "../../components/card-image-caption-link"

import { getCreatorAlphaName, getCreatorFullName } from "../../utils/creator"

const CardArtistsPage = ({ location, data }) => {
  const {
    allStrapiArtist: { nodes: artists },
    allStrapiTradingcard: { nodes: cards },
    allStrapiPainting: { nodes: paintings },
  } = data

  // If passed an artist, open to that artist. Otherwise open first artist on list.
  const [ndx, setNdx] = useState(location.state && location.state.artist ?
    artists.findIndex(a => a.lastname === location.state.artist.lastname && a.firstname === location.state.artist.firstname) : 0)

  const seo_description = "Lists the card artists represented in The Jamieson Collection, including biographical details and the selection of cards and paintings offered for sale."

  return (
    <Layout>
      <Seo title="Card Artists - The Jamieson Collection" description={seo_description} />
      <div className="container page-container">
        <h1 className="page-head">Card Artists - {getCreatorFullName(artists[ndx])}</h1>
        <section className="artists">

          <div className="btn-container">
            <hr/>
            {artists.map((artist, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === ndx && "active-btn"}`} onClick={() => setNdx(index)}>{getCreatorAlphaName(artist)}</button>
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

              { (artists[ndx].tradingcards && artists[ndx].tradingcards.length > 0) && <>
                <h3>Available Cards:</h3>

                <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                  {cards.map((card) => {
                    return (
                      card.artist && card.artist.lastname === artists[ndx].lastname ?
                       <div key={card.id}>
                        {card.images && <CardImageCaptionLink item={card} caption_format="Series" /> }
                      </div>
                      : null
                    )
                  })}
                </div></>
              }

              { (artists[ndx].paintings && artists[ndx].paintings.length > 0) && <>
                <h3>Available Art Works:</h3>

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
                </div></>
              }

              { artists[ndx].publications &&
                <>
                  <h3>Selected Publications:</h3>
                  <div className="bio">
                      <ReactMarkdown source={artists[ndx].publications} />
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
  {
    allStrapiArtist(
      limit: 100,
      filter: { iscardartist: {eq: true} },
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
        paintings {
          title
        }
        tradingcards{
          title
        }
        publications
      }
    },
    allStrapiTradingcard(
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
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 300
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        price
        slug
      }
    },
    allStrapiPainting(
      filter: { artist: { iscardartist: {eq: true} } },
      sort: { fields: order, order: ASC }
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
        slug
      }
    }
  }
`

export default CardArtistsPage
