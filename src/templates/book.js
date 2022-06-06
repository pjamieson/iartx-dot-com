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
      "height": image.height,
      "width": image.width,
      "url": image.localFile.url,
      "gatsbyImage": getImage(image.localFile.childImageSharp.gatsbyImageData)
    })
    key = key + 1
  })

  const author = authors[0]
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

  // Check for first of multiple images being vertical
  const two_up = (imageset.length > 1 && imageset[0].height > imageset[0].width )

  // Schema.org calculated values
  const seo_description = `Images of and details about the book “${title}” by ${authorname}.`
  const productDescription = subtitle ? subtitle : `A ${binding} book by ${authorname}`
  const productUrl = `https://iartx.com/books/${slug}/`
  const productImageUrl = images[0].localFile.url
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
                <Link to={`/authors/${author.slug}/`} className="btn-floating btn-action btn-primary">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
            </div> {/* item-gallery */}
            <div className="item-description">
              <div className="details">
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
        height
        width
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
