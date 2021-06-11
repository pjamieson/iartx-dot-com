import React, { useEffect, useState, useCallback, useContext } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { navigate } from "gatsby"
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBStep,
  MDBStepper
} from 'mdbreact'

import { CartContext } from "../context/cart-context"

import { cartSubtotal, cartSalesTax, cartShipping, cartTotal } from "../utils/cart"
import { formatPrice } from "../utils/format"
import {
  getPaintingQtyAvailable,
  setPaintingQtyAvailable,
  getCardQtyAvailable,
  setCardQtyAvailable,
  getBookQtyAvailable,
  setBookQtyAvailable
} from "../utils/inventory"
import { getSalesTaxRate } from "../utils/salestax"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#212529",
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      fontWeight: "500",
      "::placeholder": {
        color: "#32325d"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
}

const CheckoutComponent = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const { cart, clearCart, addToCart } = useContext(CartContext)

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const [activePanel, setActivePanel] = useState(1)

  const [bfirstname, setBFirstname] = useState('')
  const [blastname, setBLastname] = useState('')
  const [baddress, setBAddress] = useState('')
  const [baddress2, setBAddress2] = useState('')
  const [bcity, setBCity] = useState('')
  const [bcountry, setBCountry] = useState('US')
  const [bregion, setBRegion] = useState('')
  const [bzip, setBZip] = useState('')
  const [sameaddr, setSameaddr] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('US')
  const [region, setRegion] = useState('')
  const [zip, setZip] = useState('')
  const [email, setEmail] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [salesTaxRate, setSalesTaxRate] = useState(0.00)

  const valid = () => {
    if (bfirstname && blastname && baddress && bcity && bcountry && bregion && bzip && firstname && lastname && address && city && country && region && zip && email) {
      return true
    } else {
      return false
    }
  }

  const countryList = ["AU", "BS", "BE", "CA", "DK", "FI", "FR", "DE", "IE", "IT", "JP", "KR", "LU", "MX", "NL", "NZ", "NO", "PT", "PR", "ES", "SE", "CH", "GB", "US", "UM", "UT", "VG", "VI"]
  const priorityList = ["US", "CA"]

  // On loading page, confirm cart items still available
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
        if (item.itemType === "book") {
          const qtyNowAvailable = await getBookQtyAvailable(item.id)
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
      // No cart or empty cart
      setCartChanged(true)
    }
  }, [cart, addToCart])

  if (cartChanged && !succeeded) {
    navigate('/cart-changed/')
  }

  const getPaymentIntent = async () => {
    //console.log("getPaymentIntent cart", cart)
    // Need to get sales tax rate if CA shipping address and not already retreived
    // (So correct charge total can be submitted when getting Stript Payment Intent)
    let taxRate = salesTaxRate
    if (region === "CA" && salesTaxRate === 0.00) {
      taxRate = await getSalesTaxRate(zip)
      await setSalesTaxRate(taxRate)
      //console.log("checkout getPaymentIntent taxRate", taxRate)
    }
    //console.log("getPaymentIntent taxRate", taxRate)
    try {
      const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/orders/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          salesTaxRate: taxRate,
          cart
        })
      })
      const data = await response.json()
      //console.log("checkout getPaymentIntent data", data)
      setClientSecret(data.client_secret)
    } catch (err) {
      console.log('checkout getPaymentIntent err', err)
    }
  }

  const handleTabChange = (selected) => {
    setActivePanel(selected)
    if (activePanel === 2 && clientSecret === '') {
      getPaymentIntent()
      //console.log("handleTabChange clientSecret", clientSecret)
    }
  }

  const handleSameAddressClick = () => {
    setFirstname(sameaddr ? '' : bfirstname)
    setLastname(sameaddr ? '' : blastname)
    setAddress(sameaddr ? '' : baddress)
    setAddress2(sameaddr ? '' : baddress2)
    setCity(sameaddr ? '' : bcity)
    setRegion(sameaddr ? '' : bregion)
    setCountry(sameaddr ? 'United States' : bcountry)
    setZip(sameaddr ? '' : bzip)
    setSameaddr(!sameaddr)
    forceUpdate()
  }

  const handleCardChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.target.className += " was-validated"

    setProcessing(true)
    let processingSucceeded = false
    let processPayment = true

    // Just before payment submit, confirm cart contents are still available
    let items = [] // Will later be posted to Shippo
    if (cart && cart.length > 0) {
      await Promise.all(cart.map(async item => {
        if (item.itemType === "painting") {
          const qtyNowAvailable = await getPaintingQtyAvailable(item.id)
          if (item.qty > qtyNowAvailable) {
            processPayment = false
            setCartChanged(true)
            addToCart(item, (qtyNowAvailable - item.qty)) // remove unavailable from cart
          }
          // Save item for Shippo
          items.push(
            {
              "currency": "USD",
              "quantity": item.qty,
              "sku": item.sku,
              "title": item.title,
              "total_amount": item.price,
              "weight": "10.0",
              "weight_unit": "lb"
            }
          )
          // Update cart availability
          item.qtyAvail = qtyNowAvailable

          return qtyNowAvailable // forces block to complete before continuing
        }
        if (item.itemType === "tradingcard") {
          const qtyNowAvailable = await getCardQtyAvailable(item.id)
          if (item.qty > qtyNowAvailable) {
            processPayment = false
            setCartChanged(true)
            addToCart(item, (qtyNowAvailable - item.qty)) // remove unavailable from cart
          }
          // Save item for Shippo
          const itemTotal = (item.qty * item.price)
          items.push(
            {
              "currency": "USD",
              "quantity": item.qty,
              "sku": item.sku,
              "title": item.title,
              "total_price": itemTotal,
              "weight": "0.5",
              "weight_unit": "lb"
            }
          )
          // Update cart availability
          item.qtyAvail = qtyNowAvailable

          return qtyNowAvailable // forces block to complete before continuing
        }
        if (item.itemType === "book") {
          const qtyNowAvailable = await getBookQtyAvailable(item.id)
          if (item.qty > qtyNowAvailable) {
            processPayment = false
            setCartChanged(true)
            addToCart(item, (qtyNowAvailable - item.qty)) // remove unavailable from cart
          }
          // Save item for Shippo
          items.push(
            {
              "currency": "USD",
              "quantity": item.qty,
              "sku": item.sku,
              "title": item.title,
              "total_amount": item.price,
              "weight": "1.0",
              "weight_unit": "lb"
            }
          )
          // Update cart availability
          item.qtyAvail = qtyNowAvailable

          return qtyNowAvailable // forces block to complete before continuing
        }
      }))
    } else {
      // No cart or empty cart (Safety; shouldn't happen)
      console.log("submitPayment - Shouldn't happen!")
      processPayment = false
      setCartChanged(true)
    }

    if (cartChanged || !processPayment) {
      setProcessing(false)
      navigate('/cart-changed/')
    }

    if (processPayment) {
      // Submit Payment
      const paymentResult = await stripe.confirmCardPayment(`${clientSecret}`, {
        receipt_email: email,
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${bfirstname} ${blastname}`,
            address: {
              line1: `${baddress}`,
              line2: `${baddress2}`,
              city: `${bcity}`,
              state: `${bregion}`,
              postal_code: `${bzip}`,
              country: `${bcountry}`
            }
          }
        }
      })

      if (paymentResult.error) {
        console.log('paymentResult.error', paymentResult.error)
        // Show error to buyer (e.g., insufficient funds)
        setError(`Payment processing failed: ${paymentResult.error.message}`)
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          setError(null)
          setSucceeded(true)

          // Update availability/inventory in Strapi
          try {
            if (cart && cart.length > 0) {
              cart.forEach(item => {
                if (item.itemType === "painting") {
                  setPaintingQtyAvailable(item.id, (item.qtyAvail - item.qty))
                }
                if (item.itemType === "tradingcard") {
                  setCardQtyAvailable(item.id, (item.qtyAvail - item.qty))
                }
                if (item.itemType === "book") {
                  setBookQtyAvailable(item.id, (item.qtyAvail - item.qty))
                }
              })
            }
          } catch(error) {
            console.log("checkout update inventory error", error)
          }

          // POST order and shipping address to Strapi
          const order = {
            salesTaxRate,
            paymentIntent: paymentResult.paymentIntent,
            firstname,
            lastname,
            address,
            address2,
            city,
            state: region,
            zip,
            country,
            email,
            newsletter,
            cart
          }

          const addStrapiOrder = async () => {
            try {
              const order_response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/orders`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
              })
              return await order_response.json()
            } catch(error) {
              console.log("checkout post order error", error)
            }
          }
          const order_data = await addStrapiOrder()
          //console.log("order_data", order_data)

          // Also POST order & shipping address to Shippo
          const orderSubtotal = cartSubtotal(cart)
          const orderShipping = cartShipping(cart)
          const orderSalesTax = cartSalesTax(cart, salesTaxRate)
          const orderTotal = cartTotal(cart, salesTaxRate)
          const fullname = `${firstname} ${lastname}`

          const order_num = `A-6${order_data.order_id}`

          const shipment = {
            "to_address": {
              "name": fullname,
              "street1": address,
              "street2": address2,
              "city": city,
              "state": region,
              "zip": zip,
              "country": country,
              "email": email
            },
            "line_items": items,
            "order_number": order_num,
            "order_status": "PAID",
            "placed_at": order_data.order_created,
            "shipping_cost": orderShipping,
            "shipping_cost_currency": "USD",
            "shipping_method": "USPS First Class Package",
            "shop_app": "Shippo",
            "subtotal_price": orderSubtotal,
            "total_price": orderTotal,
            "total_tax": orderSalesTax,
            "currency": "USD",
            "weight": ".5",
            "weight_unit": "lb"
          }

          try {
            await fetch(`${process.env.GATSBY_STRAPI_API_URL}/orders/shipping`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(shipment)
            })
          } catch (err) {
            console.log("checkout post shippo error", err)
          }

          // Add to email list, if opted in
          if (newsletter) {
            const email_entry = {
              firstname,
              lastname,
              email
            }
            try {
              fetch(`${process.env.GATSBY_STRAPI_API_URL}/emails`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(email_entry)
              })
            } catch(error) {
              console.log("checkout post email error", error)
            }
          } // end newsletter

          // Remove now-purchased items from cart
          clearCart()

          processingSucceeded = true
        }
      }
      setProcessing(false)

      // Go to SuccessPage
      if (processingSucceeded) {
        navigate('/success/', { state: { firstname } })
      }
    }
  }

  return (
    <MDBCard className='w-100'>
      <MDBCardBody>
        <MDBRow>
          <MDBCol lg='8' className='mb-4'>

            <MDBStepper form>
              <MDBStep form>
                <a href="#formstep1" onClick={() => handleTabChange(1)}>
                  <MDBBtn color={activePanel === 1 ? "primary" : "default"} circle>
                    1
                  </MDBBtn>
                </a>
                <h4 className={activePanel === 1 ?
                  "mb-4 mt-0 font-weight-bold" :
                  "mb-4 mt-0 font-weight-bold text-muted"}>
                  Billing Address
                </h4>
              </MDBStep>
              <MDBStep form>
                <a href="#formstep2" onClick={() => handleTabChange(2)}>
                  <MDBBtn color={activePanel === 2 ? "primary" : "default"} circle>
                    2
                  </MDBBtn>
                </a>
                <h4 className={activePanel === 2 ?
                  "mb-4 mt-0 font-weight-bold" :
                  "mb-4 mt-0 font-weight-bold text-muted"}>
                  Shipping Address
                </h4>
              </MDBStep>
              <MDBStep form>
                <a href="#formstep3" onClick={() => handleTabChange(3)}>
                  <MDBBtn color={activePanel === 3 ? "primary" : "default"} circle>
                    3
                  </MDBBtn>
                </a>
                <h4 className={activePanel === 3 ?
                  "mb-4 mt-0 font-weight-bold" :
                  "mb-4 mt-0 font-weight-bold text-muted"}>
                  Email & Payment
                </h4>
              </MDBStep>
            </MDBStepper>

            <form className="needs-validation" onSubmit={(e) => handleSubmit(e)} noValidate>
              <MDBRow>
                {activePanel === 1 && (
                  <MDBCol md='12'>
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput type="text" id="bfirst" name="bfirst" label="First Name*" value={bfirstname} className="mt-4" required onChange={(event) => setBFirstname(event.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="blast" name="blast" label="Last Name*"  value={blastname} className="mt-4" required onChange={(e) => setBLastname(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="baddress" name="baddress" label="Address*" value={baddress} className="mt-0" required onChange={(e) => setBAddress(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="baddress2" name="baddress2" label="Address 2 (optional)" value={baddress2} onChange={(e) => setBAddress2(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput type="text" id="bcity" name="bcity" label="City*" required value={bcity} onChange={(e) => setBCity(e.target.value)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="country-region-zip">
                      <MDBCol lg='4' md='12' className='mb-4'>
                        <label htmlFor="bcountry" className="input-label mt-0">Country*</label>
                        <CountryDropdown id="bcountry" valueType="short" whitelist={countryList} priorityOptions={priorityList} className="form-control" required value={bcountry} onChange={(val) => setBCountry(val)} />
                      </MDBCol>
                      <MDBCol lg='4' md='6' className='mb-4'>
                        <label htmlFor="bregion" className="input-label mt-0">State/Province*</label>
                        <RegionDropdown id="bregion" valueType="short" className="form-control" required country={bcountry} countryValueType="short" value={bregion} onChange={(val) => setBRegion(val)}>
                          Country
                        </RegionDropdown>
                      </MDBCol>
                      <MDBCol lg='4' md='6' className='mt-2 mb-4'>
                        <MDBInput type="text" id="bzip" name="bzip" label="Zip/Postal Code*" value={bzip} className='' required onChange={(e) => setBZip(e.target.value)} />
                      </MDBCol>
                    </MDBRow>

                    <MDBBtn color='primary' rounded className='float-right'
                      onClick={() => handleTabChange(2)}>
                      Next
                    </MDBBtn>
                  </MDBCol>
                )}
                {activePanel === 2 && (
                  <MDBCol md='12'>
                    <MDBRow>
                      <MDBCol md="12" className="same-addr">
                        <MDBInput type="checkbox" id="sameaddr" name="sameaddr" label="Same as Billing Address" onChange={() => handleSameAddressClick()} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="bfirst" name="bfirst" label="First Name*" value={firstname} className="mt-4" required onChange={(e) => setFirstname(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="blast" name="blast" label="Last Name*"  value={lastname} className="mt-4" required onChange={(e) => setLastname(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="address" name="address" label="Address*" value={address} className="mt-0" required onChange={(e) => setAddress(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput type="text" id="address2" name="address2" label="Address 2 (optional)" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput type="text" id="city" name="city" label="City*" required value={city} onChange={(e) => setCity(e.target.value)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="country-region-zip">
                      <MDBCol lg='4' md='12'>
                        <label htmlFor="country" className="input-label mt-0">Country*</label>
                        <CountryDropdown id="country" valueType="short" whitelist={countryList} priorityOptions={priorityList} className="form-control" required value={country} onChange={(val) => setCountry(val)} />
                      </MDBCol>
                      <MDBCol lg='4' md='6'>
                        <label htmlFor="region" className="input-label mt-0">State/Province*</label>
                        <RegionDropdown id="region" valueType="short" className="form-control" required country={country} countryValueType="short" value={region} onChange={(val) => setRegion(val)}>
                          Country
                        </RegionDropdown>
                      </MDBCol>
                      <MDBCol lg='4' md='6' className="mt-2">
                        <MDBInput type="text" id="zip" name="zip" label="Zip/Postal Code*" value={zip} className='zip mt-2' required onChange={(e) => setZip(e.target.value)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn color='primary' rounded className='float-left'
                      onClick={() => handleTabChange(1)}>
                      Prev
                    </MDBBtn>
                    <MDBBtn color='primary' rounded className='float-right'
                      onClick={() => handleTabChange(3)}>
                      Next
                    </MDBBtn>
                  </MDBCol>
                )}
                {activePanel === 3 && (
                  <MDBCol md='12' className="payment-panel">
                    <MDBRow>
                      <MDBCol md="12">
                        <MDBInput type="email" id="email" name="email" label="Email* (required)" required className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <small className='email-note text-muted'>
                          Your email is required for communication about this order
                        </small>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="12">
                        <MDBInput type="checkbox" id="newsletter" name="newsletter" label="Subscribe to occasional (infrequent) email" onChange={() => setNewsletter(!newsletter)} />
                      </MDBCol>
                    </MDBRow>
                    <hr className='mb-4' />
                    <MDBRow>
                      <MDBCol md='12' className='mb-3'>
                        <label className="input-label mt-0">
                          Credit card details*
                        </label>
                        <CardElement options={CARD_ELEMENT_OPTIONS} onChange={(event) => handleCardChange(event)} />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn className='float-left' color='primary' rounded onClick={() => handleTabChange(2)}>
                      Prev
                    </MDBBtn>
                    <MDBBtn type="submit" id="submit" className="float-right" color='primary' rounded disabled={!stripe || !valid() || processing || disabled || succeeded}>
                      <span id="button-text">
                        {processing ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                         : ("Submit")}
                      </span>
                    </MDBBtn>
                    {/* Show any error that happens when processing the payment */}
                    {error && (
                      <div className="card-error float-right" role="alert">
                        {error}
                      </div>
                    )}
                  </MDBCol>
                )}
              </MDBRow>
            </form>
          </MDBCol>

          <MDBCol lg='4' className='mb-4'>
            <MDBCard>
              <MDBCardBody>
                <h4 className='mb-4 mt-1 h5 text-center font-weight-bold'>
                  Order Summary
                </h4>
                <hr />
                <div>
                  {(cart && cart.length > 0) &&
                      cart.map(item => {
                        return <div key={item.sku}>
                          <MDBRow sm="12">
                            <MDBCol className="item">
                              <p key={item.sku}>
                                {item.qty > 1 ? (item.qty + " - ") : null}
                                {item.title} - <span className='text-muted'>{item.subtitle}</span>
                                {item.qty > 1 ? <span className='text-muted'> (@ ${item.price} each)</span> : null}
                              </p>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol className="price mb-2">
                              {formatPrice(item.price * item.qty)}
                            </MDBCol>
                          </MDBRow>
                        </div>
                      }
                    )}
                    {(cart && cart.length > 0) &&
                      <div>
                        <hr />
                        <div className="summary-totals">
                          <p>Subtotal:</p>
                          <p>{formatPrice(cartSubtotal(cart))}</p>
                        </div>
                        <div className="summary-totals">
                          <p>Sales tax:</p>
                          <p>{formatPrice(cartSalesTax(cart, salesTaxRate))}</p>
                        </div>
                        <div className="summary-totals">
                          <p>Shipping:</p>
                          <p>{cartShipping(cart) > 0 ? formatPrice(cartShipping(cart)) : `Free`}</p>
                        </div>
                        <hr />
                        <div className="summary-totals">
                          <p>Total:</p>
                          <p><strong>{formatPrice(cartTotal(cart, salesTaxRate))}</strong></p>
                        </div>
                      </div>
                    }
                    {(cart && cart.length === 0) &&
                      <h3>Order processed</h3>
                    }
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
  )
}

export default CheckoutComponent;
