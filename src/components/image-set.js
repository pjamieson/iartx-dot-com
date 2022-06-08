import React from "react"
import { MDBLightbox } from "mdb-react-ui-kit"
import { MDBMultiCarousel, MDBMultiCarouselItem } from "mdb-react-multi-carousel";
import { getCreatorFullName } from "../utils/creator"
import { getImageUrl } from "../utils/image-url"

const ImageSet = ({ creator, title, form, prof, images }) => {
  //console.log("ImageSet images", images)
  const creatorname = getCreatorFullName(creator)

  // Check for first of multiple images being vertical
  let two_up = false
  if ( (images.length > 1) && images[0].width && images[0].height && (images[0].height > images[0].width ) ) {
    two_up = true
  }

  const alt_text = `The ${form} ${title} by the ${prof} ${creatorname}`

  let key = 0

  return (
    <section>
      { !two_up &&
        <img src={getImageUrl(images[0], "medium")} className="img-fluid shadow-4" alt={alt_text} />
      }
      { two_up &&
        <div className="gallery-image-container">
          <img src={getImageUrl(images[0], "medium")} className="img-fluid shadow-4" alt={alt_text} />
          <img src={getImageUrl(images[1], "medium")} className="img-fluid shadow-4" alt={alt_text} />
        </div>
      }
      { images.length > 2 &&
        <MDBLightbox>
          <MDBMultiCarousel className="mt-2 ms-5 me-5" items={images.length > 3 ? 4 : 3} breakpoint={false} lightbox>
          { images.map(image => {
            return <MDBMultiCarouselItem key={++key} className="" src={getImageUrl(image, "large")} alt={alt_text} />
            })
          }
          </MDBMultiCarousel>
        </MDBLightbox>
      }
    </section>
  )
}

export default ImageSet;
