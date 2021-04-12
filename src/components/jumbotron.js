import React from "react"
import { Link } from "gatsby"

import { MDBBtn, MDBIcon, MDBJumbotron } from "mdbreact"

//import { FaYoutube } from "react-icons/fa"

const Jumbotron = () => {
  return (
    <MDBJumbotron style={{ padding: 0 }}>
      <div className="bg-img text-center">
        <div className="site-header">
          <h1 className="headline">The Jamieson Collection</h1>
        </div>
        { false &&
          <div className="front-promo">
            <h3>1951 Topps by Blake Jamieson - Week 4</h3>
            <h4>
              <i>Only available until February 10th at:&nbsp;</i>
              <a href="https://www.topps.com/cards-collectibles/online-brands/topps-1951.html" target="_blank" rel="noreferrer">Topps.com
              </a>
            </h4>
          </div>
        }

        {/*<div className="actions">
          <div className="you-tube-plug">
            <a href="https://www.youtube.com/user/BlakeJamieson?sub_confirmation=1" className="social-link nav-link waves-effect waves-light" target="_blank" rel="noreferrer">
              <FaYoutube className="social-icon fa-5x"></FaYoutube>
            </a>
            <div className="pitch">
              <h4>Subscribe to my YouTube Channel</h4>
              <p>Live Streams Mon, Wed & Fri at 10:23pm Eastern</p>
            </div>
          </div>*/}
          <div className="featured-link">
            <Link to="/art/haitian-art/">
              <MDBBtn color="secondary">
                Haitian Art
                <MDBIcon icon="caret-right" className="ml-2" />
              </MDBBtn>
            </Link>
          </div>
        {/*</div>*/}

      </div>
    </MDBJumbotron>
  )
}

export default Jumbotron
