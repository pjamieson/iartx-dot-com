import React, { useContext } from 'react';

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import Seo from "../components/seo"

const CartChangedPage = ({ location }) => {
  const { cart } = useContext(CartContext)
  return (
    <Layout>
      <Seo title="Cart Changed" />
        <div className="container page-container success">
          <h1 className="page-head">Cart Changed</h1>
          <MDBCard>
            <MDBCardBody>
              { (cart && cart.length > 0) &&
                <div>
                  <h2 className='mt-1 text-center'>
                    Sorry, an item that was in your cart is no longer available.
                  </h2>
                  <p className="mb-4 lead">Please review your updated cart.</p>
                </div>
              }
              { (cart && cart.length === 0) &&
                <div>
                  <h2 className='mt-1 text-center'>
                    Sorry, the item(s) that were in your cart are no longer available.
                    <p className="mb-4 lead">Your cart has been cleared.</p>
                  </h2>
                </div>
              }
            </MDBCardBody>
          </MDBCard>
        </div>
    </Layout>
  )
}

export default CartChangedPage;
