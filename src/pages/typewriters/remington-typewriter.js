import React from "react"
import { graphql } from "gatsby"

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

import remington1 from "../../images/Remington 1934 front 400.jpg"
import remington2 from "../../images/Remington 1934 back 400.jpg"
import remington3 from "../../images/Remington 1934 case 400.jpg"

const RemingtonTypewritersPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const seo_description = "A brief history of Noiseless typewriter models, including Remington Noiseless Portable, Monarch Deluxe Noiseless, and Underwood Noiseless 77, with illustrations of collectable examples offered for purchase."

  return (
    <Layout>
      <Seo title="Remington Typewriters - Noiseless Models" description={seo_description} />
      <div className="container page-container">
        <h1>Typewriters - Remington Noiseless Models</h1>

        <section className="brand-story">
          <div className="historical-images">
            <div className="image-container">
              <img className="card" src={remington1} alt="1934 Remington Noiseless Portable typewriter" />
            </div>
            <p>1934 Remington Noiseless Portable</p>
            <div className="image-container">
              <img className="card" src={remington2} alt="1934 Remington Noiseless Portable typewriter back" />
            </div>
            <p>1934 Remington Noiseless Portable (back)</p>
          </div>
          <div className="historical-text">
            <h2>A Brief History of "Noiseless" Typewriters</h2>

            <p>"Noiseless" typewriters employ a thrust-action that prevents the machine's typebars from striking its platen at full force. Essentially, the typebars' motion halts just as it reaches the platen, thus reducing—though certainly not eliminating—the sound made by the strike. Introduced in 1891 on the Franklin typewriter, the noiseless mechanism was subsequently enhanced by its creator, Wellington P. Kidder, and adopted by the Noiseless Typewriter Company of Middletown, Connecticut, who released their <b>Noiseless Portable</b> in 1921.</p>

            <h3>Remington Buys the Noiseless Typewriter Company</h3>

            <p>In 1924, Remington bought the Noiseless Typewriter Company. George G. Going, the inventor of the Noiseless Portable, went on to work for Remington. About seven years later, in August 1931, Remington introduced their <b>Remington Noiseless Portable</b>, followed in November 1931 by the larger <b>Remington Noiseless Model Seven</b>. The "beefier" <b>Remington Noiseless 8</b>—virtually identical to the Noiseless Model Seven under the hood—was launched in October 1932.</p>

            <p>The <b>Remington Noiseless Junior</b> was introduced in September 1933. A scaled down version of the Remington Noiseless Portable, it has no backspace, no tabs, and no ribbon color selector. It retailed for $57.50, $12.00 less that its more—functional brother. Reportedly, only 1401 Remington Noiseless Juniors were manufactured before its production was halted.</p>

            <h3>Underwood Noiseless Models - Re-branded Remingtons</h3>

            <p>Apparently by arrangement with Remington, the <b>Underwood Noiseless 77</b> was produced at the Remington factory from February 1932 to March 1940. It is an "identical twin" of the Remington Noiseless Model Seven. Similarly, the <b>Underwood Noiseless Portable</b>—identical to the Remington Noiseless Portable—was made in the Remington factory from about 1937 to March 1942.</p>

            <h3>The Last Pre-War Noiseless Models</h3>

            <p>The <b>Remington Deluxe Noiseless</b>, produced from May 1938 to April 1941, was essentially a Noiseless Seven with a smaller paper table and a touch regulator. This machine was also branded as the <b>Monarch Deluxe Noiseless</b>, the Remington Noiseless Portable, and the <b>Smith Premier Noiseless Portable</b>. The retail price in 1940 was $67.50. Finally, there was the <b>Remington Deluxe Noiseless Portable</b>—called the <i>1941 Line</i>—manufactiued from about June 1940 to May 1942. It retailed for $69.50.</p>

            <p>Remington's production of typewriters stopped in 1942 as manufacturing shifted to support the war effort. Production of the desktop Noiseless #7 resumed in September 1945.</p>

            <h4>Primary Sources:</h4>
            <p className="source"><b>TypewriterDatabase[dot]com</b>. The <em>Remington Typewriter Serial Numbers</em> page at https://typewriterdatabase.com/remington.42.typewriter-serial-number-database#np_01, and the photo-illustrated <em>...Typewriters by Year then Serial Numbers</em> pages for Remington Noiseless, Remington Noiseless Portable, Remington Noiseless #7, Remington Deluxe Noiseless, and other Noiseless models.</p>
            <p className="source">Polt, Richard. <b>Noiseless Portable</b> on <i>The Classic Typewriter Page</i> at https://site.xavier.edu/polt/typewriters/noiselessportable.html. (Retrieved 18 Aug 2022)</p>
            <p className="source">Polt, Richard. <b>Remington Portables</b> on <i>The Classic Typewriter Page</i> at https://site.xavier.edu/polt/typewriters/rem-portables.htm#noiselessportable. (Retrieved 18 Aug 2022)</p>
          </div>
          <div className="historical-images">
            <div className="image-container">
              <img className="card" src={remington3} alt="1934 Remington Noiseless Portable typewriter in case" />
            </div>
            <p>1934 Remington Noiseless Portable in case</p>
          </div>
        </section>

        <section className="gallery">
          <h2 className="typewriter-gallery">Remington Typewriters Offered for Purchase</h2>
          { paintings.length === 0 &&
            <MDBCard className="na-card">
              <MDBCardBody>
                <div>
                  <h3 className='mt-1 text-center'>More Remington typewriters coming soon...</h3>
                </div>
              </MDBCardBody>
            </MDBCard>
          }
          { paintings.length > 0 &&
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(painting => {
              return <div key={painting.sku}>
                {painting.images && <CardImageCaptionLink item={painting} caption_format="Typewriter" /> }
                </div>
              })}
            </div>
          }
        </section>

      </div>
    </Layout>
  )
}

export const query = graphql`
{
  allStrapiPainting(
    filter: {
      subgenres: {elemMatch: {slug: {eq: "remington-typewriter"}}},
      qty: {gt: 0}
    },
    sort: {
      fields: order, order: ASC
    }
  ) {
    nodes {
      id: strapiId
      sku
      artist {
        firstname
        lastname
        aka
      }
      title
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
      price
      subgenres {
        slug
      }
      slug
    }
  }
}
`

export default RemingtonTypewritersPage
