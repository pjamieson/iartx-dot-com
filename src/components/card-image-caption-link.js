import React from "react";
import { Link } from "gatsby"

import { getCreatorFullName } from "../utils/creator"
import { formatPrice } from "../utils/format"
import { getImageUrl } from "../utils/image-url"

const CardImageCaptionLink = ({ item, caption_format }) => {
  //console.log("CardImageLinkTitle item", item)

  // Use the primary image, the first of the images set
  const image_url = ( item.images[0] ? getImageUrl(item.images[0], "medium") : "" )

  let line2 = ""
  let link = ""
  let alt_text = ""

  if (caption_format === "Artist") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "An Original Painting"
    link = `/gallery/${item.slug}/`
    alt_text = `The artwork ${item.title} by ${getCreatorFullName(item.artist)}`
  } else if (caption_format === "Author") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Collectable Book"
    link = `/books/${item.slug}/`
    alt_text = `The book ${item.title} by ${getCreatorFullName(item.authors[0])}`
  } else if (caption_format === "Gallery") {
    line2 = `by ${getCreatorFullName(item.artist)}`
    link = `/gallery/${item.slug}/`
    alt_text = `The artwork ${item.title} by ${getCreatorFullName(item.artist)}`
  } else if (caption_format === "Books") {
    line2 = `by ${getCreatorFullName(item.authors[0])}`
    link = `/books/${item.slug}/`
    alt_text = `The book ${item.title} by ${getCreatorFullName(item.authors[0])}`
  } else if (caption_format === "Card") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Sports Art Card"
    link = `/cards/${item.slug}/`
    alt_text = `The trading card ${item.title} by ${getCreatorFullName(item.artist)}`
  } else if (caption_format === "Series") {
    line2 = item.cardseries.name
    link = `/cards/${item.slug}/`
    alt_text = `The trading card ${item.title} by ${getCreatorFullName(item.artist)}`
  } else if (caption_format === "Typewriter") {
    line2 = item.subtitle
    link = `/gallery/${item.slug}/`
    alt_text = `${item.title} ${item.subtitle}`
  }

  return (
    <div className="card" key={item.id}>

      <div className="img-hover-zoom">
        <a href={link} className="ripple">
          <img className="img-fluid" src={image_url} alt={alt_text} />
        </a>
      </div>

      <div>
        <Link to={link} className="btn-floating btn-action btn-primary">
          <i className="fas fa-chevron-right"></i>
        </Link>
      </div>

      <div className="card-body">
        <h4 className="card-title">{item.title}</h4>
        <h5 className="card-subtitle">{line2}</h5>
        <h5>{item.price > 0 ? formatPrice(item.price) : `Inquire`}</h5>
      </div>
    </div>
  )
}

export default CardImageCaptionLink;
