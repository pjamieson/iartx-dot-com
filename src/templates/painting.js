import React, { useState, useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, navigate, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge, MDBLightbox } from "mdb-react-ui-kit"
import { MDBMultiCarousel, MDBMultiCarouselItem } from "mdb-react-multi-carousel";

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { getCreatorFullName } from "../utils/creator"
import { formatPrice } from "../utils/format"
import { getPaintingQtyAvailable } from "../utils/inventory"

const PaintingPage = ({
  data: {
    painting: {
      id,
      sku,
      title,
      subtitle = {},
      artist = {},
      images,
      subgenres = {},
      date = {},
      size = {},
      medium = {},
      description = {},
      price,
      qty: qtyAvail,
      slug,
      archive,
      form,
    },
  },
}) => {
  const { isInCart, addToCart } = useContext(CartContext)

  let imageset = []
  let key = 0
  images.forEach(image => {
    imageset.push({
      key,
      title,
      "height": image.height,
      "width": image.width,
      "url": image.localFile.url,
      "gatsbyImage": getImage(image.localFile.childImageSharp.gatsbyImageData)
    })
    key = key + 1
  })

  const artistname = getCreatorFullName(artist)

  const itemType = "painting"
  const subt = subtitle ? subtitle : `An original ${form}`
  const qty = 1 //initialize with 1 of item
  const cartItem = {
    itemType,
    id,
    sku,
    slug,
    creator: artistname,
    title,
    subtitle: subt,
    image: images[0],
    url: images[0].localFile.url,
    qty,
    qtyAvail,
    price
  }
  const [inCart, setInCart] = useState(isInCart(cartItem))
  const [processing, setProcessing] = useState(false)

  // On loading page, confirm painting is still available
  const [qtyAvailNow, setQtyAvailNow] = useState(1) // one available by default
  useEffect(() => {
    const fetchData = async () => {
      setProcessing(true)
      setQtyAvailNow(await getPaintingQtyAvailable(id))
      setProcessing(false)
    }
    fetchData()
  }, [id])

  if (qtyAvailNow === 0 && inCart) {
    // remove from cart
    addToCart(cartItem, -1)
    setInCart(false)
  }

  const prof = subgenres[0].name === "Haitian Art" ? "Haitian artist" : "artist"

  // Check for first of multiple images being vertical
  const two_up = (imageset.length > 1 && imageset[0].height > imageset[0].width )

  // Schema.org calculated values
  const seo_description = `Images of and details about the original ${form} “${title}” by the ${prof} ${artistname}.`
  const productDescription = subtitle ? subtitle : `An original ${form} by ${artistname}`
  const productUrl = `https://iartx.com/gallery/${slug}/`
  const productImageUrl = images[0].url
  const productAvailability = qtyAvailNow > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock"

  return (
    <Layout>
      <Seo title={title} description={seo_description} />
      <Helmet>
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "productID": "${sku}",
            "sku": "${sku}",
            "category": "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork",
            "name": "${title}",
            "description": "${productDescription}",
            "url": "${productUrl}",
            "image": "${productImageUrl}",
            "brand":"The Jamieson Collection",
            "logo": "https://iartx.com/icons/icon-72x72.png",
            "offers": [
              {
                "@type": "Offer",
                "url": "${productUrl}",
                "price": "${price}",
                "priceCurrency": "USD",
                "itemCondition": "https://schema.org/UsedCondition",
                "availability": "${productAvailability}"
              }
            ]
          }
        `}
        </script>
      </Helmet>
      <div className="page-container">
        <article className="item-details">
          <h1>{title}</h1>
          <div className="details-container">
            <div className="item-gallery">
              <div className="gallery-image-container">
                <GatsbyImage className="img-fluid rounded" image={imageset[0].gatsbyImage} alt={title} />
                { two_up && <GatsbyImage className="img-fluid rounded" image={imageset[1].gatsbyImage} alt={title} />
                }
              </div>
              { imageset.length > 2 &&
                <MDBLightbox>
                  <MDBMultiCarousel className="mt-2 ms-5 me-5" items={imageset.length > 3 ? 4 : 3} breakpoint={false} lightbox>
                  { imageset.map(image => {
                      return <MDBMultiCarouselItem key={image.key} className="" src={image.url} alt={image.title} />
                    })
                  }
                  </MDBMultiCarousel>
                </MDBLightbox>
              }

              { (qtyAvail > 0) &&
                <div className="back-btn">
                  <Link to={`/artists/${artist.slug}/`} className="btn-floating btn-action btn-primary">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              }
              { (qtyAvail <= 0) &&
                <div className="back-btn">
                  <Link to={`/archive/`} className="btn-floating btn-action btn-primary">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              }
            </div> {/* item-gallery */}
            <div className="item-description">
              <div className="details">
                <h2>An original {form}<br />by {artistname}</h2>
                { (subtitle && subtitle.length) &&
                  <h3 className="subtitle">{subtitle}</h3>
                }

                { (date && size) && <p>{date} - {size}</p> }
                { (!(date && size) && date) && <p>{date}</p> }
                { (!(date && size) && size) && <p>{size}</p> }

                { medium && <p>{medium}</p> }

                { description && <ReactMarkdown source={description} /> }

                { (qty > 0 && processing) &&
                  <h3>Confirming availability...</h3>
                }
                <div className="inventory-msg">
                  { (qtyAvail > 0 && qtyAvailNow <= 0) &&
                    <h3>Sorry, this piece is no longer available.</h3>
                  }

                  { (archive && qtyAvail === 0 && qtyAvailNow <= 0) &&
                    <h3>This piece has been sold or is Not for Sale.</h3>
                  }
                </div>
              </div> {/* details */}
              <div className="price-action">
                <h3 className="price">{formatPrice(price)}</h3>
                <div>
                  { (price > 10 && qtyAvailNow > 0 && !inCart) &&
                    <button type="button" className="btn btn-add-to-cart btn-primary btn-rounded" onClick={() => {
                      addToCart(cartItem, qty)
                      setInCart(true)
                    }}>
                      <i className="fas fa-cart-plus"></i>Add to Cart
                    </button>
                  }
                  { (inCart && qtyAvailNow > 0) &&
                    <MDBBadge color="secondary">Added to Cart</MDBBadge>
                  }
                </div>
                { !inCart &&
                  <div className="btn-inquire">
                    <button type="button" className="btn btn-inquire btn-primary btn-rounded" onClick={() => {
                      navigate('/inquire/', {
                        state: {
                          title,
                          sku,
                          gatsbyImage: imageset[0].gatsbyImage
                        }
                      })
                    }}>Inquire</button>
                  </div>
                }
              </div> {/* price-action */}
            </div> {/* item-description */}
          </div> {/* details-container */}
        </article> {/* item-details */}
      </div> {/* page-container */}
    </Layout>
  )
}

export default PaintingPage

export const query = graphql`
  query GetSinglePainting($slug: String) {
    painting: strapiPainting(slug: {eq: $slug}) {
      id: strapiId
      sku
      artist {
        firstname
        lastname
        aka
        slug
      }
      title
      subtitle
      images {
        height
        width
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 900
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
          url
        }
      }
      subgenres {
        name
      }
      date
      size
      medium
      description
      price
      qty
      slug
      archive
      form
    }
  }
`
