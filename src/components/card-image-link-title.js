import React from "react";
import { Link } from "gatsby"
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDBCardImage, MDBMask, MDBView } from "mdbreact";

import { formatPrice } from "../utils/format"

const CardImageLinkTitle = ({ item }) => {
  console.log("CardImageLinkTitle item", item)

  // The primary image is the first of the images set
  //const image = getImage(item.images[0].localFile.childImageSharp.gatsbyImageData)

  const link = `/gallery/${item.slug}`

  const subtitle = (item.subtitle && item.subtitle.length > 0 ? item.subtitle : 'An Original Painting')

  return (
    <div className="card" key={item.id}>

      <MDBView hover zoom rounded>
        {/*<GatsbyImage className="img-fluid w-100" image={image} alt={item.title} />*/}
        <MDBCardImage src={item.images[0].url} className="img-fluid" waves />
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
        { (true) && <div>
            <h5 className="card-subtitle">{subtitle}</h5>
            <h5>{formatPrice(item.price)}</h5>
          </div>
        }
      </div>
    </div>
  )
}

export default CardImageLinkTitle;
