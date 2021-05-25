import React, { useState } from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import { MDBContainer } from "mdbreact";

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const CardSeriesPage = ({ location, data }) => {
  const {
    allStrapiCardseries: { nodes: series },
    allStrapiTradingcard: { nodes: cards },
  } = data

  // If passed a series, open to that series. Otherwise open first series on list.
  const [ndx, setNdx] = useState(location.state && location.state.series ?
    series.findIndex(s => s.name === location.state.series.name) : 0)

  const seo_description = "Lists the series of trading cards included in The Jamieson Collectiom, including details about each series and selected cards offered for sale."

  return (
    <Layout>
      <Seo title="Card Series - The Jamieson Collection" description={seo_description} />
      <div className="container page-container">
        <h1 className="page-head">Card Series - {series[ndx].name}</h1>
        <section className="artists">

          <div className="btn-container series-btn-container">
            <hr/>
            {series.map((ser, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === ndx && "active-btn"}`} onClick={() => setNdx(index)}>{ser.name}</button>
                </div>
              )
            })}
          </div>

          <MDBContainer>
            <article className="content-container gallery">

              <h2>{series[ndx].subhead}</h2>

              <div className="bio">
                <ReactMarkdown source={series[ndx].description} />
              </div>

              <h3>Available Cards:</h3>

              <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                {cards.map((card) => {
                  return (
                    card.cardseries && card.cardseries.name === series[ndx].name ?
                     <div key={card.id}>
                      {card.images && <CardImageCaptionLink item={card} caption_format="Card" /> }
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
    allStrapiCardseries(
      sort: { fields: order, order: DESC }
    ) {
      nodes {
        name
        subhead
        description
      }
    },
    allStrapiTradingcard(
      sort: { fields: player___name, order: ASC }
    ) {
      nodes {
        id: strapiId
        sku
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
    }
  }
`

export default CardSeriesPage
