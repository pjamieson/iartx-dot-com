import React from "react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CheckoutComponent from "../components/checkout"

import { MDBContainer, MDBRow } from 'mdbreact'

// Make sure to call `loadStripe` outside of a component’s render
//  to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.GATSBY_STRIPE_PK}`)

const CheckoutPage = () => {
  //console.log("CheckoutPage GATSBY_STRIPE_PK", `${process.env.GATSBY_STRIPE_PK}`)
  return (
    <Layout>
      <Seo title="Checkout" />
      <div className="container page-container checkout">
        <MDBContainer>
          <h1 className="page-head">Checkout</h1>
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
