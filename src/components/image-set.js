import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const ImageSet = ({ location, imageset }) => {
  //console.log("ImageSet imageset", imageset)
  return (
    <div>
      <section className="gallery">
        <div className="imageset uk-grid-small uk-child-width-1-2@s uk-child-width-1-2@m" uk-grid="masonry: true">
          { imageset.map(image => {
            //console.log("ImageSet image.gatsbyImage", image.gatsbyImage)
            return <div key={image.key}>
              <GatsbyImage className="card" image={image.gatsbyImage} alt={image.title} />
            </div>
            })
          }
        </div>
      </section>
    </div>
  )
}

export default ImageSet;
