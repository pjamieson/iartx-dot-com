import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const FeaturedImagelink = ({ item }) => {
  //console.log("FeaturedImagelink item", item)

  // Use the primary image, the first of the images set
  const image = getImage(item.images[0].localFile.childImageSharp.gatsbyImageData)

  const link = `/gallery/${item.slug}/`

  return (
    <div className="img-hover-zoom">
      <a href={link} className="ripple">
        <GatsbyImage className="img-fluid rounded" image={image} alt={item.title} />
      </a>
    </div>
  )
}

export default FeaturedImagelink;
