/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Global style files for Bootstrap and MDBReact
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap/dist/js/bootstrap.min.js";
//import "@popperjs/core/dist/umd/popper.min.js";
import "mdbreact/dist/css/mdb.css"
import "./src/styles/scss/mdb-pro.scss"

//import "@stripe/stripe-js"

import React from "react"
import CartContextProvider from "./src/context/cart-context"

export const wrapRootElement = ({element}) => (
  <CartContextProvider>
    {element}
  </CartContextProvider>
)
