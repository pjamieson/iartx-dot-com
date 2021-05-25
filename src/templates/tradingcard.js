import React, { useContext, useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ImageSet from "../components/image-set"

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
      "url": image.url,
      "gatsbyImage": getImage(image.localFile.childImageSharp.gatsbyImageData)
    })
    key = key + 1
  })

  //console.log("painting.js artist", artist)
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
    url: images[0].url,
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

  const seo_description = `Images of and details about the ${cardseries.name} trading card ${title} by ${artistname}.`
  //console.log("painting.js seo_description", seo_description)

  const productUrl = `https://iartx.com/cards/${slug}/`

  const productImageUrl = images[0].url
  //console.log("tradingcard.js productImageUrl", productImageUrl)

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

      <div className="container page-container">
        <article className="p2020-card-details">
          <h1>{productTitle}</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">

            <div>
              {/*<div className="overlay">
                <GatsbyImage className="card card-img-top" image={image0.gatsbyImage} alt={title} />
              </div>*/}

              { (imageset && imageset.length > 0) &&
                <ImageSet imageset={imageset} />
              }

              { (qtyAvail > 0) &&
                <div className="back-btn">
                  <Link to="/cards/card-artists/" state={{ artist: artist }} className="btn-floating btn-action btn-primary">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              }
            </div>

            <div className="buy-or-inquire">
              <div className="card-description">
                <h2>{subtitle ? subtitle : `Artist: ${artistname}`}</h2>

                { subtitle && <p><strong>Artist:</strong> {artistname}</p> }

                { limitation && <p><strong>Limitation:</strong> {limitation}</p> }

                { description && <ReactMarkdown source={description} /> }

                { processing && <h3>Confirming availability...</h3> }

                <div className="detail-btns">
                  { (qtyAvailNow === 0) &&
                    <h3>Sorry, this card is no longer available.</h3>
                  }

                  { (qtyAvailNow > 0 && price > 10) &&
                    <div className="add-to-cart">
                      <h3 className="price">{formatPrice(price)}</h3>
                      {!inCart &&
                        <button type="button" className="btn btn-add-to-cart btn-primary btn-rounded" onClick={() => {
                          addToCart(cartItem, qty)
                          setInCart(true)
                        }}>
                          <i className="fas fa-cart-plus"></i>Add to Cart
                        </button>
                      }
                    </div>
                  }

                  { (qtyAvailNow > 0 && inCart) &&
                    <MDBBadge color="secondary">Added to Cart</MDBBadge>
                  }

                  { (qtyAvailNow > 0 && price <= 10) &&
                    <div className="inquire">
                      <button type="button" className="btn btn-inquire btn-secondary btn-rounded">
                        Inquire
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
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
      localFile {
        childImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
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
