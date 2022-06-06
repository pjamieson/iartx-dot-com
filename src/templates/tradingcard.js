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
import { getCardQtyAvailable } from "../utils/inventory"

const Tradingcard = ({
  data: {
    tradingcard: {
      id,
      sku,
      slug,
      artist = {},
      cardseries = {},
      player = {},
      title,
      subtitle = {},
      images,
      limitation = {},
      description = {},
      details = {},
      qty: qtyAvail,
      price,
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

  const itemType = "tradingcard"
  const qty = 1 //initialize with 1 of item
  const cartItem = {
    itemType,
    id,
    sku,
    slug,
    creator: artistname,
    title,
    subtitle,
    image: images[0],
    url: images[0].localFile.url,
    qty,
    qtyAvail,
    price
  }
  const [inCart, setInCart] = useState(isInCart(cartItem))
  const [processing, setProcessing] = useState(false)

  // On loading page, confirm card is still available
  const [qtyAvailNow, setQtyAvailNow] = useState(1) // one available by default
  useEffect(() => {
    const fetchData = async () => {
      setProcessing(true)
      setQtyAvailNow(await getCardQtyAvailable(id))
      setProcessing(false)
    }
    fetchData()
  }, [id])

  if (qtyAvailNow === 0 && inCart) {
    // remove from cart
    addToCart(cartItem, -1)
    setInCart(false)
  }

  // Check for first of multiple images being vertical
  const two_up = (imageset.length > 1 && imageset[0].height > imageset[0].width )

  // Schema.org calculated values
  const productTitle = `${title} - ${cardseries.name}`
  const seo_description = `Images of and details about the ${cardseries.name} trading card ${title} by ${artistname}.`
  const productUrl = `https://iartx.com/cards/${slug}/`
  const productImageUrl = images[0].localFile.url
  const productAvailability = qtyAvailNow > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock"

  return (
    <Layout>
      <Seo title={productTitle} description={seo_description} />
      <Helmet>
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "productID": "${sku}",
            "sku": "${sku}",
            "category": "Arts & Entertainment > Hobbies & Creative Arts > Collectibles > Collectible Trading Cards",
            "name": "${productTitle}",
            "description": "${subtitle}",
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
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "${productAvailability}"
              }
            ]
          }
        `}
        </script>
      </Helmet>
      <div className="page-container">
        <article className="item-details">
          <h1>{productTitle}</h1>
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

              <div className="back-btn">
                <Link to="/cards/card-artists/" state={{ artist: artist }} className="btn-floating btn-action btn-primary">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
            </div> {/* item-gallery */}
            <div className="item-description">
              <div className="details">
                <h2 className="padded-header">{subtitle ? subtitle : `Artist: ${artistname}`}</h2>

                { subtitle && <p><strong>Artist:</strong> {artistname}</p> }
                { limitation && <p><strong>Limitation:</strong> {limitation}</p> }
                { description && <ReactMarkdown source={description} /> }

                { processing && <h3>Confirming availability...</h3> }

                <div className="inventory-msg">
                  { (qtyAvailNow <= 0) &&
                    <h3>Sorry, this card is no longer available.</h3>
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

export default Tradingcard

export const query = graphql`
query GetSingleTradingcard($slug: String) {
  tradingcard: strapiTradingcard(
    slug: {eq: $slug}) {
    id: strapiId
    sku
    slug
    artist {
      lastname
      firstname
      aka
      slug
    }
    cardseries {
      name
    }
    player {
      name
    }
    title
    subtitle
    images {
      height
      width
      localFile {
        childImageSharp {
          gatsbyImageData(
            width: 450
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
        url
      }
    }
    limitation
    description
    details
    qty
    price
  }
}
`
