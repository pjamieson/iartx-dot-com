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
import { getPaintingQtyAvailable } from "../utils/inventory"

const PaintingPage = ({
  data: {
    painting: {
      id,
      sku,
      title,
      subtitle = {},
      artist = {},
      images = {},
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

  const creatorname = (form === "Typewriter" ? "typewriter" : getCreatorFullName(artist))

  const itemType = "painting"
  const subt = subtitle ? subtitle : `An original ${form}`
  const qty = 1 //initialize with 1 of item
  const cartItem = {
    itemType,
    id,
    sku,
    slug,
    creator: creatorname,
    title,
    subtitle: subt,
    imageUrl: getImageUrl(images[0], "small"),
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

  // Schema.org calculated values
  const seo_description = (form === "Typewriter" ? `Images and details about the ${title} typewriter from The Jamieson Collection` : `Images of and details about the original ${form} “${title}” by the ${prof} ${creatorname)

  const productCategory = (form === "Typewriter" ? "Office Supplies > Office Equipment > Typewriters" : "Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork")

  const productDescription = (subtitle ? subtitle : `An original ${form} by ${creatorname}`)
  const productUrl = `https://iartx.com/gallery/${slug}/`
  const productImageUrl = getImageUrl(images[0], "small")
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
            "category": "${productCategory}",
            "name": "${title}",
            "description": "${productDescription}",
            "url": "${productUrl}",
            "image": [
              "${productImageUrl}"
            ],
            "brand": {
              "@type": "Brand",
              "name": "${creatorname}"
            },
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

              <ImageSet creator={artist} title={title} form={form} prof="artist" images={images} />

              <div className="back-btn">
                { form !== "Typewriter" &&
                    <Link to={`/artists/${artist.slug}/`} className="btn-floating btn-action btn-primary">
                      <i className="fas fa-chevron-left"></i>
                    </Link>
                }
                { form === "Typewriter" &&
                    <Link to={`/typewriters/${subgenres[0].slug}/`} className="btn-floating btn-action btn-primary">
                      <i className="fas fa-chevron-left"></i>
                    </Link>
                }
              </div>

            </div> {/* item-gallery */}

            <div className="item-description">
              <div className="details">
                { form !== "Typewriter" &&
                  <h2>An original {form}<br />by {creatorname}</h2>
                }
                { form === "Typewriter" &&
                  <h2>A Vintage Typewriter</h2>
                }
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
      subgenres {
        name
        slug
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
