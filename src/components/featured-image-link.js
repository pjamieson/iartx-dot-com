import React from 'react';
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDBCardImage, MDBMask, MDBView } from "mdbreact";

const FeaturedImagelink = ({ location, item }) => {
  //console.log("FeaturedImagelink item", item)

  // The primary image is the first of the images set
  //const image = getImage(item.images[0].localFile.childImageSharp.gatsbyImageData)

  const link = `/gallery/${item.slug}/`

  return (
    <MDBView hover zoom rounded>
      {/*<GatsbyImage className="img-fluid w-100" image={image} alt={item.title} />*/}
      <MDBCardImage src={item.images[0].url} className="img-fluid" waves />
      <a href={link}>
        <MDBMask overlay="white-slight" />
      </a>
    </MDBView>
  )
}

export default FeaturedImagelink;
