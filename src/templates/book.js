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
import { getBookQtyAvailable } from "../utils/inventory"

const BookPage = ({
  data: {
    book: {
      id,
      sku,
      slug,
      isbn = {},
      title,
      subtitle = {},
      authors,
      images,
      subgenres = {},
      publisher = {},
      pubplace = {},
      pubyear = {},
      pubstring = {},
      edition = {},
      binding = {},
      description = {},
      condition = {},
      price,
      qty: qtyAvail,
      isAsNew,
      size,
      pagecount,
      ozweight,
    },
  },
}) => {
  const { isInCart, addToCart } = useContext(CartContext)

  const author = authors[0]
  const creatorname = getCreatorFullName(author)

  const itemType = "book"
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
    price,
    ozweight
  }
  const [inCart, setInCart] = useState(isInCart(cartItem))
  const [processing, setProcessing] = useState(false)

  // On loading page, confirm book is still available
  const [qtyAvailNow, setQtyAvailNow] = useState(1) // one available by default
  useEffect(() => {
    const fetchData = async () => {
      setProcessing(true)
      setQtyAvailNow(await getBookQtyAvailable(id))
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
  const seo_description = `Images of and details about the book “${title}” by ${creatorname}.`
  const productDescription = subtitle ? subtitle : `A ${binding} book by ${creatorname}`
  const productUrl = `https://iartx.com/books/${slug}/`
  const productImageUrl = getImageUrl(images[0], "small")
  const productCondition = isAsNew ? "https://schema.org/NewCondition" : "http://schema.org/UsedCondition"
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
            "isbn": "${isbn}",
            "category": "Media > Books > Print Books",
            "name": "${title}",
            "description": "${productDescription}",
            "url": "${productUrl}",
            "image": "${productImageUrl}",
            "brand": "${publisher}",
            "logo": "https://iartx.com/icons/icon-72x72.png",
            "offers": [
              {
                "@type": "Offer",
                "url": "${productUrl}",
                "price": "${price}",
                "priceCurrency": "USD",
                "itemCondition": "${productCondition}",
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

              <ImageSet creator={author} title={title} form="book" prof="author" images={images} />

              <div className="back-btn">
                <Link to={`/authors/${author.slug}/`} className="btn-floating btn-action btn-primary">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
            </div> {/* item-gallery */}
            <div className="item-description">
              <div className="details">
                <h2>A book by {creatorname}</h2>
                { (subtitle && subtitle.length) &&
                  <h3 className="subtitle">{subtitle}</h3>
                }

                { pubstring && <p>{pubstring}.</p> }
                { (edition && binding) && <p>{edition}. {binding}.</p> }
                { (size && pagecount) && <p>{size} - {pagecount} pages.</p> }

                { description && <ReactMarkdown source={description} /> }

                { condition && <p><strong>Condition:</strong> {condition}</p> }

                { (qty > 0 && processing) &&
                  <h3>Confirming availability...</h3>
                }
                <div className="inventory-msg">
                { (qtyAvailNow <= 0) &&
                  <h3>Sorry, this book is no longer available.</h3>
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

export default BookPage

export const query = graphql`
  query GetSingleBook($slug: String) {
    book: strapiBook(slug: {eq: $slug}) {
      id: strapiId
      sku
      isbn
      authors {
        firstname
        lastname
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
      }
      publisher
      pubplace
      pubyear
      pubstring
      edition
      binding
      description
      condition
      price
      qty
      slug
      isAsNew
      size
      pagecount
      ozweight
    }
  }
`
