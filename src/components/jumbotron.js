import React from "react"
import { Link } from "gatsby"

import { MDBBtn, MDBIcon } from "mdb-react-ui-kit"

const Jumbotron = () => {
  return (
    <div className="bg-image">
      <div className="text-center">
        <div className="site-header">
          <h1 className="headline">The Jamieson Collection</h1>
        </div>
          <div className="featured-link">
            <Link to="/art/haitian-art/">
              <MDBBtn color="secondary">
                Haitian Art
                <MDBIcon icon="caret-right" className="ml-2" />
              </MDBBtn>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Jumbotron
