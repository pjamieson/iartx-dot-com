import React, { useState, useContext, useEffect } from "react"
import { Helmet } from "react-helmet"

import { Link, navigate, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdb-react-ui-kit"

import { CartContext } from "../context/cart-context"

import ImageSet from "../components/image-set"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { getCreatorFullName } from "../utils/creator"
import { formatPrice } from "../utils/format"
import { getImageUrl } from "../utils/image-url"
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

  const creatorname = getCreatorFullName(artist)

  const itemType = "tradingcard"
  const qty = 1 //initialize with 1 of item
  const cartItem = {
    itemType,
    id,
    sku,
    slug,
    creator: creatorname,
    title,
    subtitle,
    imageUrl: getImageUrl(images[0], "small"),
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

  // Schema.org calculated values
  const productTitle = `${title} - ${cardseries.name}`
  const seo_description = `Images of and details about the ${cardseries.name} trading card ${title} by ${creatorname}.`
  const productUrl = `https://iartx.com/cards/${slug}/`
  const productImageUrl = getImageUrl(images[0], "small")
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
            "identifier_exists": "false",
            "category": "Arts & Entertainment > Hobbies & Creative Arts > Collectibles > Collectible Trading Cards",
            "name": "${productTitle}",
            "description": "${subtitle}",
            "url": "${productUrl}",
            "image": "${productImageUrl}",
            "brand": {
              "@type": "Brand",
              "name": "Topps"
            },
            "logo": "https://iartx.com/icons/icon-72x72.png",
            "offers": [
              {
                "@type": "Offer",
                "url": "${productUrl}",
                "price": "${price}",
                "priceCurrency": "USD",
                "priceValidUntil": "2022-07-31",
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

              <ImageSet creator={artist} title={title} form={`${cardseries.name} trading card of`} prof="artist" images={images} />

              <div className="back-btn">
                <Link to="/cards/card-artists/" state={{ artist: artist }} className="btn-floating btn-action btn-primary">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
            </div> {/* item-gallery */}
            <div className="item-description">
              <div className="details">
                <h2 className="padded-header">{subtitle ? subtitle : `Artist: ${creatorname}`}</h2>

                { subtitle && <p><strong>Artist:</strong> {creatorname}</p> }
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
                          image_src: images[0].formats.small.url
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
      formats {
        large {
          url
        }
        medium {
          url
        }
        small {
          url
        }
        thumbnail {
          url
        }
      }
      height
      width
      url
    }
    limitation
    description
    details
    qty
    price
  }
}
`
