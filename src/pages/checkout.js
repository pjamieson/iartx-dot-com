import React from "react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import stripe_badge from "../images/powered-by-stripe-blurple.svg"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CheckoutComponent from "../components/checkout"

import { MDBContainer, MDBRow } from "mdb-react-ui-kit"

// Make sure to call `loadStripe` outside of a component’s render
//  to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.GATSBY_STRIPE_PK}`)

const CheckoutPage = () => {
  //console.log("CheckoutPage GATSBY_STRIPE_PK", `${process.env.GATSBY_STRIPE_PK}`)
  return (
    <Layout>
      <Seo title="Checkout" />
      <div className="page-container checkout">
        <MDBContainer>
          <span className="checkout-header">
            <h1>Checkout</h1>
            <a href="https://stripe.com" target="_blank">
              <img src={stripe_badge} className="stripe-badge" alt="Powered by Stripe"/>
            </a>
          </span>
          <MDBRow center>
            <Elements stripe={stripePromise}>
              <CheckoutComponent />
            </Elements>
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  )
}

export default CheckoutPage;
