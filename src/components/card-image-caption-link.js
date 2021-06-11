import React from "react";
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { getCreatorFullName } from "../utils/creator"
import { formatPrice } from "../utils/format"

const CardImageCaptionLink = ({ item, caption_format }) => {
  //console.log("CardImageLinkTitle item", item)

  // Use the primary image, the first of the images set
  const image = getImage(item.images[0].localFile.childImageSharp.gatsbyImageData)

  let line2 = ""
  let link = ""

  if (caption_format === "Artist") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "An Original Painting"
    link = `/gallery/${item.slug}/`
  } else if (caption_format === "Author") {
      line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Collectable Book"
      link = `/books/${item.slug}/`
  } else if (caption_format === "Gallery") {
    line2 = `by ${getCreatorFullName(item.artist)}`
    link = `/gallery/${item.slug}/`
  } else if (caption_format === "Books") {
    line2 = `by ${getCreatorFullName(item.authors[0])}`
    link = `/books/${item.slug}/`
  } else if (caption_format === "Card") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Sports Art Card"
    link = `/cards/${item.slug}/`
  } else if (caption_format === "Series") {
    line2 = item.cardseries.name
    link = `/cards/${item.slug}/`
  }

  return (
    <div className="card" key={item.id}>

      <div className="card img-hover-zoom">
        <a href={link} className="ripple">
          <GatsbyImage className="img-fluid rounded" image={image} alt={item.title} />
        </a>
      </div>

      <div>
        <Link to={link} className="btn-floating btn-action btn-primary">
          <i className="fas fa-chevron-right pl-1"></i>
        </Link>
      </div>

      <div className="card-body">
        <h4 className="card-title">{item.title}</h4>
        <h5 className="card-subtitle">{line2}</h5>
        <h5>{formatPrice(item.price)}</h5>
      </div>
    </div>
  )
}

export default CardImageCaptionLink;
