import React, { useEffect, useState, useCallback, useContext } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { navigate } from "gatsby"
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBInput,
  MDBStepper,
  MDBStepperContent,
  MDBStepperForm,
  MDBStepperHead,
  MDBStepperStep
} from "mdb-react-ui-kit"

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

  const [btnStepper, setBtnStepper] = useState(1);
  const [prevBtnStepper, setPrevBtnStepper] = useState(0);

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('US')
  const [email, setEmail] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [sameaddr, setSameaddr] = useState(false)
  const [bfirstname, setBFirstname] = useState('')
  const [blastname, setBLastname] = useState('')
  const [baddress, setBAddress] = useState('')
  const [baddress2, setBAddress2] = useState('')
  const [bcity, setBCity] = useState('')
  const [bregion, setBRegion] = useState('')
  const [bzip, setBZip] = useState('')
  const [bcountry, setBCountry] = useState('US')

  const [salesTaxRate, setSalesTaxRate] = useState(0.00)

  const shipping_valid = () => {
    if (firstname.length > 0 && lastname.length > 0 && address.length > 0 && city.length > 1 && region.length > 1 && region.length < 7 && zip.length > 3 && country.length === 2 && email.length > 6) {
      return true
    } else { return false }
  }
  // Note: Australia, Netherlands postal codes are 4 digits - making that the min length
  const billing_valid = () => {
    if (bfirstname.length > 0 && blastname.length > 0 && baddress.length > 0 && bcity.length > 1 && bregion.length > 1 && bregion.length < 7 && bzip.length > 3 && bcountry.length === 2) {
      if (clientSecret === '') {
        getPaymentIntent()
      }
      return true
    } else { return false }
  }

  const countryList = ["AU", "BS", "BB", "BE", "VG", "CA", "DK", "FI", "FR", "DE", "IE", "IT", "MX", "NL", "NZ", "NO", "PT", "PR", "ES", "SE", "CH", "GB", "US", "UM", "VI"]
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

  const handleSameAddressClick = (newValue) => {
    let makeSame = newValue

    setBFirstname(makeSame ? firstname : '')
    setBLastname(makeSame ? lastname : '')
    setBAddress(makeSame ? address : '')
    setBAddress2(makeSame ? address2 : '')
    setBCity(makeSame ? city : '')
    setBRegion(makeSame ? region : '')
    setBCountry(makeSame ? country : 'United States')
    setBZip(makeSame ? zip : '')

    setSameaddr(newValue)
    forceUpdate()
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
          country,
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
          const orderShipping = cartShipping(cart, country)
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
    <MDBCard className="checkout-card">
      <MDBCardBody className="checkout-card-body">
        <div className="checkout-input-panel">
          <MDBStepper linear
            outerState={btnStepper}
            setOuterState={setBtnStepper}
            prevOuterState={prevBtnStepper}
            setPrevOuterState={setPrevBtnStepper}
            tag="div">
            <MDBStepperForm>
              <MDBStepperStep itemId={1} tag="div">
                <MDBStepperHead icon="1" text="Shipping" />
                <MDBStepperContent className="ship-content" tag="div">
                  <div className="multi-input-line">
                    <MDBInput
                      type="text"
                      name="firstname"
                      id="firstname"
                      wrapperClass="mb-3 me-1"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      label="First Name*"
                      validation="invalid"
                      invalid
                      required
                    />
                    <MDBInput
                      type="text"
                      name="lastname"
                      id="lastname"
                      wrapperClass="mb-3"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      label="Last Name*"
                      validation="invalid"
                      invalid
                      required
                    />
                  </div>
                  <div className="multi-input-line address">
                    <MDBInput
                      type="text"
                      name="address"
                      id="address"
                      wrapperClass="mb-3 me-1"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      label="Address*"
                      validation="invalid"
                      invalid
                      required
                    />
                    <MDBInput
                      type="text"
                      name="address2"
                      id="address2"
                      wrapperClass="mb-3"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      label="Address 2 (optional)"
                    />
                  </div>
                  <div className="multi-input-line">
                    <MDBInput
                      type="text"
                      name="city"
                      id="city"
                      wrapperClass="mb-3 me-1"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      label="City*"
                      validation="invalid"
                      invalid
                      required
                    />
                    <RegionDropdown
                      id="region"
                      valueType="short"
                      className="form-control mb-3"
                      defaultOptionLabel="State/Province"
                      country={country}
                      countryValueType="short"
                      value={region}
                      onChange={(val) => setRegion(val)}
                      required>
                      State/Province
                    </RegionDropdown>
                  </div>
                  <div className="multi-input-line">
                    <CountryDropdown
                      id="country"
                      valueType="short"
                      defaultOptionLabel="Country"
                      whitelist={countryList}
                      priorityOptions={priorityList}
                      className="form-control me-1"
                      required
                      value={country}
                      onChange={(val) => setCountry(val)}
                    />
                    <MDBInput
                      type="text"
                      name="zip"
                      id="zip"
                      wrapperClass="mb-2"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      label="Zip/Postal Code*"
                      validation="invalid"
                      invalid
                      required
                    />
                  </div>
                  <div className="order-email">
                    <MDBInput
                      type="email"
                      name="email"
                      id="email"
                      wrapperClass="mt-3 mb-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email*"
                      validation="invalid"
                      invalid
                      required
                    />
                    <small className='email-note text-muted mb-4'>
                      Your email is required for communication about this order
                    </small>
                  </div>
                  <MDBCheckbox
                    name="newsletter"
                    id="newsletter"
                    label="Subscribe to occasional (infrequent) email"
                    value={newsletter}
                    checked={newsletter}
                    onChange={() => setNewsletter(!newsletter)}
                  />
                </MDBStepperContent>
              </MDBStepperStep>

              <MDBStepperStep itemId={2} tag="div">
                <MDBStepperHead icon="2" text="Billing" />
                <MDBStepperContent className="bill-content" tag="div">
                  <div className="same-addr">
                    <MDBCheckbox
                      name="sameaddr"
                      id="sameaddr"
                      label="Same as Shipping Address"
                      value={sameaddr}
                      checked={sameaddr}
                      onChange={() => handleSameAddressClick(!sameaddr)}
                    />
                  </div>
                  <div className="multi-input-line">
                    <MDBInput
                      type="text"
                      name="bfirstname"
                      id="bfirstname"
                      wrapperClass="mb-3 me-1"
                      value={bfirstname}
                      onChange={(e) => setBFirstname(e.target.value)}
                      label="First Name*"
                      validation="invalid"
                      invalid
                      required
                    />
                    <MDBInput
                      type="text"
                      name="blastname"
                      id="blastname"
                      wrapperClass="mb-3"
                      value={blastname}
                      onChange={(e) => setBLastname(e.target.value)}
                      label="Last Name*"
                      validation="invalid"
                      invalid
                      required
                    />
                  </div>
                  <div className="multi-input-line address">
                    <MDBInput
                      type="text"
                      name="baddress"
                      id="baddress"
                      wrapperClass="mb-3 me-1"
                      value={baddress}
                      onChange={(e) => setBAddress(e.target.value)}
                      label="Address*"
                      validation="invalid"
                      invalid
                      required
                    />
                    <MDBInput
                      type="text"
                      name="baddress2"
                      id="baddress2"
                      wrapperClass="mb-3"
                      value={baddress2}
                      onChange={(e) => setBAddress2(e.target.value)}
                      label="Address 2 (optional)"
                    />
                  </div>
                  <div className="multi-input-line">
                    <MDBInput
                      type="text"
                      name="bcity"
                      id="bcity"
                      wrapperClass="mb-3 me-1"
                      value={bcity}
                      onChange={(e) => setBCity(e.target.value)}
                      label="City*"
                      validation="invalid"
                      invalid
                      required
                    />
                    <RegionDropdown
                      id="region"
                      valueType="short"
                      className="form-control mb-3"
                      defaultOptionLabel="State/Province"
                      country={bcountry}
                      countryValueType="short"
                      labelType="short"
                      value={bregion}
                      onChange={(val) => setBRegion(val)}
                      required>
                      State/Province
                    </RegionDropdown>
                  </div>
                  <div className="multi-input-line">
                    <CountryDropdown
                      id="country"
                      valueType="short"
                      defaultOptionLabel="Country"
                      whitelist={countryList}
                      priorityOptions={priorityList}
                      className="form-control me-1"
                      required
                      value={bcountry}
                      onChange={(val) => setBCountry(val)}
                    />
                    <MDBInput
                      type="text"
                      name="bzip"
                      id="bzip"
                      wrapperClass="mb-2"
                      value={bzip}
                      onChange={(e) => setBZip(e.target.value)}
                      label="Zip/Postal Code*"
                      validation="invalid"
                      invalid
                      required
                    />
                  </div>
                </MDBStepperContent>
              </MDBStepperStep>

              <MDBStepperStep itemId={3} tag="div">
                <MDBStepperHead icon="3" text="Payment" />
                <MDBStepperContent className="pay-content" tag="div">
                  <div className="payment-panel">

                    <label className="input-label mt-0" htmlFor="cardElement">
                      Credit card details*
                    </label>

                    <CardElement id="cardElement" options={CARD_ELEMENT_OPTIONS} onChange={(event) => handleCardChange(event)} />

                  </div>
                </MDBStepperContent>
              </MDBStepperStep>
            </MDBStepperForm>
          </MDBStepper>
          <div className="nav-btn-container">
            { (btnStepper === 1) && (
              <MDBBtn color='primary' rounded disabled={!shipping_valid()}
                onClick={() => {
                  btnStepper !== 3 && setPrevBtnStepper(btnStepper);
                  btnStepper <= 2 && setBtnStepper(btnStepper + 1);
                }}
              >
                Next
              </MDBBtn>
            )}
            { (btnStepper === 2) && (
              <>
              <MDBBtn color='primary' rounded
                onClick={() => {
                  btnStepper !== 1 && setPrevBtnStepper(btnStepper);
                  btnStepper >= 2 && setBtnStepper(btnStepper - 1);                }}
              >
                Prev
              </MDBBtn>
              <MDBBtn color='primary' rounded disabled={!billing_valid()}
                onClick={() => {
                  btnStepper !== 3 && setPrevBtnStepper(btnStepper);
                  btnStepper <= 2 && setBtnStepper(btnStepper + 1);
                }}
              >
                Next
              </MDBBtn>
              </>
            )}
            { (btnStepper === 3) && (
              <>
              <MDBBtn color='primary' rounded
                onClick={() => {
                  btnStepper !== 1 && setPrevBtnStepper(btnStepper);
                  btnStepper >= 2 && setBtnStepper(btnStepper - 1);                }}
              >
                Prev
              </MDBBtn>
              <MDBBtn type="submit" id="submit" color='primary' rounded disabled={!stripe ||  !shipping_valid() || !billing_valid() || processing || disabled || succeeded} onClick={(event) => handleSubmit(event)}>
                <span id="button-text">
                  {processing ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                   : ("Submit")}
                </span>
              </MDBBtn>
              </>
            )}
          </div>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error float-right" role="alert">
              {error}
            </div>
          )}
        </div> {/* input-panel */}

        <MDBCard className="checkout-order-summary">
          <MDBCardBody className="summary-card">
            <h4 className='mt-1 mb-4 h5 text-center font-weight-bold'>
              Order Summary
            </h4>
            <div>
              {(cart && cart.length > 0) &&
                  cart.map(item => {
                    return <div key={item.sku} className="item">
                      <div className="item-name">
                        <p key={item.sku}>
                          {item.qty > 1 ? (item.qty + " - ") : null}
                          {item.title} - <span className='text-muted'>{item.subtitle}</span>
                          {item.qty > 1 ? <span className='text-muted'> (@ ${item.price} each)</span> : null}
                        </p>
                      </div>
                      <div className="item-price">
                        {formatPrice(item.price * item.qty)}
                      </div>
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
                      <p>{cartShipping(cart, country) > 0 ? formatPrice(cartShipping(cart, country)) : `Free`}</p>
                    </div>
                    <hr />
                    <div className="summary-totals">
                      <p>Total:</p>
                      <p><strong>{formatPrice(cartTotal(cart, salesTaxRate, country))}</strong></p>
                    </div>
                  </div>
                }
                {(cart && cart.length === 0) &&
                  <h3>Order processed</h3>
                }
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCardBody>
    </MDBCard>
  )
}

export default CheckoutComponent;
