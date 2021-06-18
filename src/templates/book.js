import React, { useState, useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ImageSet from "../components/image-set"

import { getCreatorFullName } from "../utils/creator"
import { formatPrice } from "../utils/format"
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

  let imageset = []
  let key = 0
  images.forEach(image => {
    imageset.push({
      key,
      title,
      "url": image.localFile.url,
      "gatsbyImage": getImage(image.localFile.childImageSharp.gatsbyImageData)
    })
    key = key + 1
  })

  const author = authors[0]

  //console.log("book.js author", author)
  const authorname = getCreatorFullName(author)

  const itemType = "book"
  const qty = 1 //initialize with 1 of item
  const cartItem = {
    itemType,
    id,
    sku,
    slug,
    creator: authorname,
    title,
    subtitle,
    image: images[0],
    url: images[0].localFile.url,
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

  const seo_description = `Images of and details about the book “${title}” by ${authorname}.`
  //console.log("book.js seo_description", seo_description)

  // Schema.org calculated values
  const productDescription = subtitle ? subtitle : `A ${binding} book by ${authorname}`
  //console.log("book.js productDescription", productDescription)

  const productUrl = `https://iartx.com/books/${slug}/`

  const productImageUrl = images[0].localFile.url
  //console.log("book.js productImageUrl", productImageUrl)

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

      <div className="container page-container">
        <article className="painting-details">
          <h1>{title}</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">

            <div>

              { (imageset && imageset.length > 0) &&
                <ImageSet imageset={imageset} />
              }

              <div className="back-btn">
                <Link to={`/authors/${author.slug}/`} className="btn-floating btn-action btn-primary">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>

            </div>

            <div className="buy-or-inquire">
              <div className="card-description">
                <h2>A book by {authorname}</h2>
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

                <div className="detail-btns">
                  { (qtyAvailNow <= 0) &&
                    <h3>Sorry, this book is no longer available.</h3>
                  }

                  { (price > 10 && qtyAvailNow > 0) &&
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

                  { (price <= 10 && qtyAvailNow > 0) &&
                    <div className="inquire">
                      <button type="button" className="btn btn-inquire btn-primary btn-rounded">Inquire</button>
                    </div>
                  }

                  { (inCart && qtyAvailNow > 0) &&
                    <MDBBadge color="secondary">Added to Cart</MDBBadge>
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
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 600
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
