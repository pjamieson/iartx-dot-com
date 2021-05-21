import React from "react";
import { Link } from "gatsby"
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDBCardImage, MDBMask, MDBView } from "mdbreact";

import { getCreatorFullName } from "../utils/creator"
import { formatPrice } from "../utils/format"

const CardImageCaptionLink = ({ item, caption_format }) => {
  //console.log("CardImageLinkTitle item", item)

  // The primary image is the first of the images set
  //const image = getImage(item.images[0].localFile.childImageSharp.gatsbyImageData)

  let line2 = ""
  let link = ""

  if (caption_format === "Artist" || caption_format === "Author") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "An Original Painting"
    link = `/gallery/${item.slug}/`
  } else if (caption_format === "Gallery") {
    line2 = `by ${getCreatorFullName(item.artist)}`
    link = `/gallery/${item.slug}/`
  } else if (caption_format === "Card") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Sports Art Card"
    link = `/cards/${item.slug}/`
  } else if (caption_format === "Series") {
    line2 = item.cardseries.name
    link = `/cards/${item.slug}/`
  }

  return (
    <div className="card" key={item.id}>

      <MDBView hover zoom rounded>
        {/*<GatsbyImage className="img-fluid w-100" image={image} alt={item.title} />*/}
        <MDBCardImage src={item.images[0].url} className="img-fluid" />
        <a href={link}>
          <MDBMask overlay="white-slight" />
        </a>
      </MDBView>

      <div>
        <Link to={link} className="btn-floating btn-action btn-primary">
          <i className="fas fa-chevron-right pl-1"></i>
        </Link>
      </div>

      <div className="card-body">
        <h4>{item.title}</h4>
        <h5 className="card-subtitle">{line2}</h5>
        <h5>{formatPrice(item.price)}</h5>
      </div>
    </div>
  )
}

export default CardImageCaptionLink;
