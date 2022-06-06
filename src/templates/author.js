import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown";
import { MDBContainer } from "mdb-react-ui-kit";

import Layout from "../components/layout"
import Seo from "../components/seo"

import ArtistInfo from "../components/artist-info"
import CardImageCaptionLink from "../components/card-image-caption-link"

import { getCreatorFullName } from "../utils/creator"

const AuthorPage = ({data}) => {
  const {
    strapiAuthor: author,
    allStrapiBook: { nodes: books }
  } = data
  //console.log("author.js data", data)

  const authorname = getCreatorFullName(author)

  const pageTitle = `Author - ${authorname}`

  const seo_description = `Images of and details about books by ${authorname} offered for sale on iArtX.com.`
  //console.log("author.js seo_description", seo_description)

  return (
    <Layout>
      <Seo title={pageTitle} description={seo_description} />
      <div className="container page-container">
        <h1 className="page-head">{pageTitle}</h1>
        <section className="artists">
          <MDBContainer>
            <article className="content-container gallery">

              <ArtistInfo artist={author} />

              { (author.image[0] && author.image[0].url) &&
                <div className="image-container">
                  <img className="img-fluid card" src={author.image[0].url} alt="Portrait of the author" />
                  { (author.imagecredit) &&
                    <em><p className="img-credit">{author.imagecredit}</p></em>
                  }
                </div>
              }

              <div className="bio">
                { author.bio && <ReactMarkdown source={author.bio} /> }
                { author.biocredit && <em><p className="bio-credit">{author.biocredit}</p></em> }
              </div>

              <h3>Available Titles:</h3>

              <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                {books.map((book) => {
                  return (
                   <div key={book.id}>
                    {book.images && <CardImageCaptionLink item={book} caption_format="Author" /> }
                  </div>
                  )
                })}
              </div>

            </article>
          </MDBContainer>

        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
query GetAuthorAndWorks($slug: String) {
  strapiAuthor(slug: {eq: $slug}) {
    lastname
    firstname
    country {
      name
    }
    birth
    death
    image {
      url
    }
    imagecredit
    bio
    biocredit
  },
  allStrapiBook(
    filter: {
      authors: {elemMatch: {slug: {eq: $slug}}},
      qty: {gt: 0}
    },
    sort: { fields: pubyear, order: ASC }
  ) {
    nodes {
      id: strapiId
      sku
      authors {
        firstname
        lastname
      }
      title
      subtitle
      images {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 400
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
      price
      slug
    }
  }
}
`

export default AuthorPage
