import React, { useState, useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageSet from "../components/image-set"

//import { getGatsbyImage } from "../utils/image"
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
  //console.log("painting.js images", images)

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
  // Remove the primary (first) image. It does not appear in the optional images set.
  const image0 = imageset.shift()
  //console.log("painting.js imageset", imageset)

  //console.log("painting.js artist", artist)
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
    image: image0,
    url: image0.url,
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

  //console.log("painting.js subgenres", subgenres)
  const prof = subgenres[0].name === "Haitian Art" ? "Haitian artist" : "artist"

  const seo_description = `Images of and details about the original ${form} “${title}” by the ${prof} ${artistname}.`
  //console.log("painting.js seo_description", seo_description)

  // Schema.org calculated values
  const productUrl = `https://iartx.com/gallery/${slug}`
  //const productUrl = `localhost:8000/gallery/${subgenre.slug}/${slug}`
  //console.log("painting.js productUrl", productUrl)

  //console.log("painting.js file", file)
  const productImageUrl = image0.url
  //console.log("painting.js productImageUrl", productImageUrl)

  const productAvailability = qtyAvailNow > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock"

  return (
    <Layout>
      <SEO title={title} description={seo_description} />

      <Helmet>
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "productID": "${sku}",
            "category": "Home & Garden > Decor > Artwork",
            "name": "${title}",
            "description": "${subtitle}",
            "url": "${productUrl}",
            "image": "${productImageUrl}",
            "brand":"iArtX",
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
        <article className="painting-details">
          <h1>{title}</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">

            <div>
              <div className="overlay">
                <GatsbyImage className="card card-img-top" image={image0.gatsbyImage} alt={title} />
              </div>

              { (imageset && imageset.length > 0) &&
                <ImageSet imageset={imageset} />
              }

              { (qtyAvail > 0) &&
                <div className="back-btn">
                  <Link to={`/artists/`} state={{ artist: artist }} className="btn-floating btn-action btn-primary">
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
            </div>

            <div className="buy-or-inquire">
              <div className="card-description">
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

                <div className="detail-btns">
                  { (qtyAvail > 0 && qtyAvailNow <= 0) &&
                    <h3>Sorry, this piece is no longer available.</h3>
                  }

                  { (archive && qtyAvail === 0 && qtyAvailNow <= 0) &&
                    <h3>This piece has been sold or is Not for Sale.</h3>
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
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
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
