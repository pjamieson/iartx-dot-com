import React from "react"
import PropTypes from "prop-types"

import Navbar from "./navbar"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <div className="site">
        <Navbar />
        <div className="site-content">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
