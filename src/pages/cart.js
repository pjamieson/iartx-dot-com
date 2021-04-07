import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link, navigate } from "gatsby"
import Img from "gatsby-image"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import SEO from "../components/seo"

import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon
} from 'mdbreact';

import {
  getPaintingQtyAvailable,
  getCardQtyAvailable,
  getProductQtyAvailable
} from "../utils/inventory"
import { cartSubtotal } from "../utils/cart"
import { formatPrice } from "../utils/format"

const CartPage = () => {
  const { cart, addToCart } = useContext(CartContext)

  const [, updateState] = useState()

  const forceUpdate = useCallback(() => updateState({}), [])

  // On loading page, confirm cart items still available
  const [ cartEmpty, setCartEmpty ] = useState(false)
  const [ cartChanged, setCartChanged ] = useState(false)
  useEffect(() => {
    if (cart && cart.length > 0) {
      Promise.all(cart.map(async item => {
        if (item.itemType === "painting") {
          const qtyNowAvailable = await getPaintingQtyAvailable(item.id)
          if (item.qty > qtyNowAvailable) {
            setCartChanged(true)
            addToCart(item, (qtyNowAvailable - item.qty)) // remove unavailable from cart
          }
          // Update cart availability
          item.qtyAvail = qtyNowAvailable

          return qtyNowAvailable // forces block to complete before continuing
        }
        if (item.itemType === "tradingcard") {
          const qtyNowAvailable = await getCardQtyAvailable(item.id)
          if (item.qty > qtyNowAvailable) {
            setCartChanged(true)
            addToCart(item, (qtyNowAvailable - item.qty)) // remove unavailable from cart
          }
          // Update cart availability
          item.qtyAvail = qtyNowAvailable

          return qtyNowAvailable // forces block to complete before continuing
        }
        if (item.itemType === "product") {
          const qtyNowAvailable = await getProductQtyAvailable(item.id)
          if (item.qty > qtyNowAvailable) {
            setCartChanged(true)
            addToCart(item, (qtyNowAvailable - item.qty)) // remove unavailable from cart
          }
          // Update cart availability
          item.qtyAvail = qtyNowAvailable

          return qtyNowAvailable // forces block to complete before continuing
        }
      }))
    } else {
      setCartEmpty(true)
    }
  }, [cart, addToCart])

  if (cartChanged) {
    navigate('/cart-changed/')
  }

  return (
    <Layout>
      <SEO title="Cart" />
      <div className="container page-container">
        <MDBContainer className="cart">
          <h1 className="page-head">Cart</h1>
          <MDBRow center>
            <MDBCard className='w-100'>
              <MDBCardBody>
                <div className="table-responsive">
                  {(cart && cart.length > 0) &&
                  <MDBTable className='product-table'>
                    <MDBTableHead>
                      <tr>
                        <th scope="col"> </th>
                        <th scope="col" className="text-left">Item</th>
                        <th scope="col" className="text-right">Price</th>
                        <th scope="col"className="text-center">Quantity</th>
                        <th scope="col"className="text-right">Amount</th>
                        <th scope="col"> </th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {cart.map(item => {
                        return <tr key={item.identifier}>
                          <td className="img-cell">
                            <Img className="cart-image" fluid={item.fluid} alt={item.title}/>
                          </td>
                          <td className="item-cell">
                            <div className="cart-item">
                              <h4 className='mt-3' key={item.identifier}>
                                {item.title}
                              </h4>
                              <p className='text-muted'>{item.subtitle}</p>
                            </div>
                          </td>
                          <td className="item-price text-right">
                            {formatPrice(item.price)}
                          </td>
                          <td className="qty-cell">
                            {(item.qty <= item.qtyAvail) &&
                              <div className="number-input">
                                <button type="button" className="minus"
                                  onClick={() => {
                                    addToCart(item, -1)
                                    forceUpdate()
                                  }}>
                                  <i className="fa fa-chevron-down" aria-hidden="true"> </i>
                                </button>
                                <input type="number" value={item.qty} readOnly />
                                <button type="button" className="plus" disabled={item.qty === item.qtyAvail}
                                  onClick={() => {
                                    addToCart(item, 1)
                                    forceUpdate()
                                  }}>
                                  <i className="fa fa-chevron-up" aria-hidden="true"></i>
                                </button>
                              </div>
                            }
                          </td>
                          <td className="item-price text-right">
                            {formatPrice(item.price * item.qty)}
                          </td>
                          <td className="remove-cell">
                            <MDBBtn size="md">
                              <MDBIcon icon="trash-alt" size="lg" aria-hidden="true"
                                onClick={() => {
                                  addToCart(item, -(item.qty))
                                  forceUpdate()
                                }}>
                              </MDBIcon>
                            </MDBBtn>
                          </td>
                        </tr>
                      })}
                      <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td className="item-price text-right">Subtotal:</td>
                        <td className="item-price text-right">
                          {formatPrice(cartSubtotal(cart))}
                        </td>
                        <td> </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                  }
                  {(cartEmpty) && <h3>Your cart is empty.</h3>}
                </div>
              </MDBCardBody>
            </MDBCard>

            <div className="checkout-open">
              {(cart && cart.length > 0) &&
                <Link to="/checkout/" className="btn btn-primary btn-rounded">
                  Checkout<i className="fas fa-chevron-right"></i>
                </Link>
              }
            </div>

          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  )
}

export default CartPage;
