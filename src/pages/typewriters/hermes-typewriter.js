import React from "react"
import { graphql } from "gatsby"

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

import hermes1 from "../../images/Hermes 1936 Baby Featherweight 400.jpg"
import hermes2 from "../../images/Hermes 1949 Baby 400.jpg"
import hermes3 from "../../images/Hermes 1954 Baby 400.jpg"
import hermes4 from "../../images/Hermes 1959 Rocket 400.jpg"
import hermes5 from "../../images/Hermes 1969 Rocket 400.jpg"
import hermes20 from "../../images/Hermes 1938 2000 400.jpg"
import hermes21 from "../../images/Hermes 1961 3000 400.jpg"
import hermes22 from "../../images/Hermes 1969 3000 400.jpg"
import hermes23 from "../../images/Hermes 1972 3000 400.jpg"

const HermesTypewritersPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const seo_description = "A brief history of Hermes portable typewriter models manufactured from the 1930s through the 1970s, covering Hermes 2000, 3000, Featherweight, Baby and Rocket."

  return (
    <Layout>
      <Seo title="Hermes Typewriters" description={seo_description} />
      <div className="container page-container">
        <h1>Hermes Typewriters - Portables & Ultra-Portables</h1>

        <section className="brand-story">
          <div className="historical-images">
            <div className="image-container">
              <img className="card" src={hermes1} alt="1936 Hermes Baby Featherweight typewriter" />
            </div>
            <p>1936 Hermes Baby Featherweight</p>
            <div className="image-container">
              <img className="card" src={hermes2} alt="1949 Hermes Baby typewriter" />
            </div>
            <p>1949 Hermes Baby</p>
            <div className="image-container">
              <img className="card" src={hermes3} alt="1954 Hermes Baby typewriter" />
            </div>
            <p>1954 Hermes Baby</p>
            <div className="image-container">
              <img className="card" src={hermes4} alt="1959 Hermes Rocket typewriter" />
            </div>
            <p>1959 Hermes Rocket</p>
            <div className="image-container">
              <img className="card" src={hermes5} alt="1969 Hermes Rocket typewriter" />
            </div>
            <p>1969 Hermes Rocket</p>
          </div>
          <div className="historical-text">
            <h2>A Brief History of E. Paillard S.A. and their Hermes Portable Typewriters</h2>

            <p>Hermes typewriters were designed and manufactured by the firm E. Paillard & Cie. S.A., of Yverdon, Switzerland. (Some erroneously state that these typewriters were products of Hermès of Paris; they were not.) Paillard had started out as a family business in 1814, making watch and music box mechanisms. They produced standard-size manual typewriter models beginning in 1923, expanded into cameras and projectors (branded Bolex Paillard) in the 1940s, and entered the electric typewriter market in 1959.</p>

            <h3>The 1930s — Paillard’s First Portable and Ultra-Portable Typewriter Models</h3>

            <p>Paillard’s first portable typewriter—the <b>Hermes 2000</b>—launched in 1933, and was followed by the <b>Hermes Baby</b> and the <b>Hermes Baby Featherweight</b> in 1935. The Baby and Baby Featherweight each weighed in at just over 8 pounds/3.8kg with their metal lid—about half the weight of the Hermes 2000—and together were the first widely-distributed ‘ultra-portable’ typewriter.</p>

            <p>In spite of the Featherweight decal that appears on the right top of the metal shell, there does not appear to be any mechanical difference between the ‘plain’ Baby and the Baby Featherweight. These ultra-portables quickly found popularity with journalists and others who used typewriters ‘in the field’ and with others who just wanted a ‘lap-tap’. While inovative design played a major role in the dramatic reduction in their size and weight compared to other portables, that reduction was also partially accomplished by providing fewer features than larger typewriters. The earliest Babies/Featherweights did not offer a margin release key, a shift lock key, nor even a carriage return lever.</p>

            <h3>The 1940s — The Hermes Baby Gets Its Wings</h3>

            <p>By 1938, the Baby had had a carriage return lever and a margin release key added to its feature set, and in 1940 a new design—now known as the <b>Jubilee Model</b>—made its debut. The most striking visual difference seen in the Jubilee Model is the now-signature ‘gull-wing’ covers over the previously-exposed ribbon spools. A shift lock key was also added, as was a new lid and handle design, and it seems that the Featherweight decal that had previously appeared on some Babies was retired altogether. A new version of the Baby decal—still usually affixed to top left of the redesigned metal shell—was also introduced. The ultra-portable's overall dimensions remained virtually unchanged, and the new model only gained about half a pound in weight over the original one.</p>

            <p>Near the end of the decade—in 1949—some machines came off the Swiss assembly line sporting a <b>Hermes Rocket</b> decal in place of the Hermes Baby one. As was the case with Babies and Baby Featherweights, the Rocket name and branding apparently had everything to do with marketing and nothing to do with the mechanics under the shell. Until Baby/Rocket production ceased in the 1970s, the Baby and the Rocket shared the same sequence of serial numbers (just as the Baby and Baby Featherweight had) with their only differences being cosmetic. You may sometimes see the question posed: Which is better, the Baby or the Rocket? The answer is that it simply depends on when (and perhaps where) the Baby/Rocket was manufactured, not on the Baby or Rocket label itself.</p>

            <h3>1950s & 1960s — The Baby/Rocket Evolves and the Preeminent Portable Arrives</h3>

            <p>In 1950, 1954, 1960 and 1964, Baby/Rocket model updates were released with the size and weight remaining about the same until the 1964 model put on about half a pound. The most visible differences were the oval nameplate that replaced the decal on the top left of the metal shell, along with a more modern style of keyboard keys in 1954, and the slightly larger platen diameter and bi-color ribbon capability that appeared in 1960. In 1964, the gull-wing ribbon covers disappeared, replaced by a one-piece top and ribbon cover.</p>

            <p>Meanwhile, the Hermes 2000 portable—which had been continuously manufactured since its 1933 launch—saw the arrival of its successor, the <b>Hermes 3000</b>, in 1958. Hermes 2000 production was then phased out by mid-1960. Due to the combination of its outstanding design, quality, durability and touch, many consider the Hermes 3000 to be the preeminent portable typewriter. The first generation 3000 (1958-1966)—known as the ‘curvy’ for its metal shell’s rounded edges—is perhaps the collectors' favorite. The second generation 3000 (1966-1970)—with its shell more angular than the first generation's—is also widely collected.</p>

            <h3>1970s — Plastic Shells & Farmed-Out Manufacturing</h3>

            <p>The third generation Hermes 3000 (1970-1979) was the last. Rather than a metal shell like the previous generations, it has a boxy, very 1970s-looking, plastic shell. By 1968, at least some of the Baby/Rockets were also produced with plastic shells.</p>

            <p>Many of the plastic-shelled Baby/Rockets, the last of the second generation 3000s produced in 1970, and all of the third generation 3000s were manufactured and/or assembled in countries outside Switzerland, including in France and Hungry for the Hermes 3000, and ‘Western Germany’ and Brazil for the Baby/Rocket. It appears that second generation Hermes 3000 production moving to France coincided with a 3.5 million jump in serial numbers. A plate glued to the back of each machine indicates where it was produced. However, from 1970 to 1976, every Baby/Rocket we've seen only notes ‘A Paillard Product’ and does not name their place of manufacture or assembly.</p>

            <p>Production of all Hermes typewriter models appears to have ended by 1976, except for the third generation Hermes 3000, which—as noted above—was manufactured into 1979. Note that some Baby and Rocket machines said to have been manufactured after 1976 have been reported, but we have not seen any with the Paillard name on them. Instead they simply note that they are ‘A Hermes Precisa International Product.’</p>

            <p>According to the website of the Typewriter Museum at Helisinki [Finland] Business College, E. Paillard S.A. was absorbed by Olivetti S.p.A. (Italy) in 1981.</p>

            <h4>Primary Sources:</h4>

            <p className="source">Polt, Richard. <b>The Typewriter Revolution</b>. Woodstock, VT: The Countryman Press [2015]. Pages 102 (Hermes 3000) and 109 (Hermes Baby).</p>

            <p className="source"><b>TypewriterDatabase[dot]com</b>. <em><a href="https://typewriterdatabase.com/hermes.82.typewriter-serial-number-database" target="_blank" rel="noopener noreferrer">Hermes Typewriter Serial Numbers</a>.</em> Retrieved 05 Apr 2023.</p>

            <p className="source"><b>—</b>. <em><a href="https://typewriterdatabase.com/Hermes.2000.82.bmys" target="_blank" rel="noopener noreferrer">Hermes 2000 Typewriters by Year then Serial Number</a>.</em> Retrieved 05 Apr 2023. [Photo-illustrated galleries of typewriters of this model]</p>

            <p className="source"><b>—</b>. <em><a href="https://typewriterdatabase.com/Hermes.3000.82.bmys" target="_blank" rel="noopener noreferrer">Hermes 3000 Typewriters by Year then Serial Number</a>.</em> Retrieved 05 Apr 2023. [Photo-illustrated galleries of typewriters of this model]</p>

            <p className="source"><b>—</b>. <em><a href="https://typewriterdatabase.com/Hermes.Baby.82.bmys" target="_blank" rel="noopener noreferrer">Hermes Baby Typewriters by Year then Serial Number</a>.</em> Retrieved 05 Apr 2023. [Photo-illustrated galleries of typewriters of this model]</p>

            <p className="source"><b>—</b>. <em><a href="https://typewriterdatabase.com/Hermes.Baby+Featherweight.82.bmys" target="_blank" rel="noopener noreferrer">Hermes Baby Featherweight Typewriters by Year then Serial Number</a>.</em> Retrieved 05 Apr 2023. [Photo-illustrated galleries of typewriters of this model]</p>

            <p className="source"><b>—</b>. <em><a href="https://typewriterdatabase.com/Hermes.Media+2000.82.bmys" target="_blank" rel="noopener noreferrer">Hermes Media 2000 Typewriters by Year then Serial Number</a>.</em> Retrieved 05 Apr 2023. [Photo-illustrated galleries of typewriters of this model]</p>

            <p className="source"><b>—</b>. <em><a href="https://typewriterdatabase.com/Hermes.Media+3.82.bmys" target="_blank" rel="noopener noreferrer">Hermes Media 3 Typewriters by Year then Serial Number</a>.</em> Retrieved 05 Apr 2023. [Photo-illustrated galleries of typewriters of this model]</p>

            <p className="source"><b>—</b>. <em><a href="https://typewriterdatabase.com/Hermes.Rocket.82.bmys" target="_blank" rel="noopener noreferrer">Hermes Rocket Typewriters by Year then Serial Number</a>.</em> Retrieved 05 Apr 2023. [Photo-illustrated galleries of typewriters of this model]</p>

            <p className="source"><b>Typewriter Museum [Helsinki, Finland]</b>. <em><a href="https://typewriter.slk.fi/typewriter-collection/hermes/" target="_blank" rel="noopener noreferrer">Hermes Typewriters Page</a>.</em> Retrieved 05 Apr 2023.</p>
          </div>

          <div className="historical-images">
            <div className="image-container">
              <img className="card" src={hermes20} alt="1938 Hermes 2000 typewriter" />
            </div>
            <p>1938 Hermes 2000</p>
            <div className="image-container">
              <img className="card" src={hermes21} alt="1961 Hermes 3000 typewriter" />
            </div>
            <p>1961 Hermes 3000 (1st generation)</p>
            <div className="image-container">
              <img className="card" src={hermes22} alt="1961 Hermes 3000 typewriter" />
            </div>
            <p>1969 Hermes 3000 (2nd generation)</p>
            <div className="image-container">
              <img className="card" src={hermes23} alt="1972 Hermes 3000 typewriter" />
            </div>
            <p>1972 Hermes 3000 (3rd generation)</p>
          </div>
        </section>

        <section className="gallery">
          <h2 className="typewriter-gallery">Hermes Typewriters Offered for Purchase</h2>
          { paintings.length === 0 &&
            <MDBCard className="na-card">
              <MDBCardBody>
                <div>
                  <h2 className='mt-1 text-center'>More Hermes typewriters coming soon...</h2>
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
      subgenres: {elemMatch: {slug: {eq: "hermes-typewriter"}}},
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

export default HermesTypewritersPage
