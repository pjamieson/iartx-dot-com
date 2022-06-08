
export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      return cart
    }
  } catch(err) {
    // intentionally empty
  }
  return []
}

// Functions below replicated in strapi/config/functions/cart.js
// A private Node package that both projects use would be a better solution

export const cartSubtotal = (cart) => {
  const subtotal = cart.reduce((counter, item) => {
    return counter + item.price * item.qty
  }, 0)

  return subtotal
}

export const cartSalesTax = (cart, taxRate) => {
  const subtotal = cartSubtotal(cart)
  let salestax = 0.00

  if (taxRate > 0) {
    const cartSalesTax = (subtotal * taxRate)
    salestax = Math.round((cartSalesTax + Number.EPSILON) * 100) / 100
    //console.log("cart.js cartSalesTax salestax", salestax)
  }

  return salestax
}

export const cartShipping = (cart, country) => {

  // Iterate through cart to get shipping weight
  let weightoz = 0

  if (cart && cart.length > 0) {
    cart.forEach(item => {
      if (item.itemType === "book") {
        if (item.ozweight) {
          weightoz = weightoz + item.ozweight
        }
      }
      if (item.itemType === "tradingcard") {
        weightoz = weightoz + 4
      }
    })
  }
  //console.log("cart.js cartShipping() weightoz", weightoz)

  function uspsFirstClassPackageInternationalRate(rate2lb, rate3lb, rate4lb, oz) {
    let shiprate = 0.00

    // assuming packing materials weight of 6 oz
    let roundUpLbs = Math.ceil((oz + 6)/16)

    while (roundUpLbs > 0) {
      if (roundUpLbs >= 4) {
        shiprate += rate4lb
        roundUpLbs -= 4
      } else if (roundUpLbs === 3) {
        shiprate += rate3lb
        roundUpLbs = 0
      } else if (roundUpLbs <= 2) {
        shiprate += rate2lb
        roundUpLbs = 0
      }
    }
    //console.log("cart.js uspsFirstClassPackageInternationalRate shiprate", shiprate)
    return shiprate
  }

  switch (country) {
    case 'US': // United States
    case 'PR': // Puerto Rico
    case 'VI': // US Virgin Islands
    case 'UM': // US Minor Outlying Islands
      return 0.00; // Free domestic shipping
    case 'CA': // Canada
      return uspsFirstClassPackageInternationalRate(21.25, 33.50, 44.75, weightoz)
    case 'MX': // Mexico
      return uspsFirstClassPackageInternationalRate(21.75, 33.00, 45.25, weightoz)
    case 'FR': // France
    case 'DE': // Germany
    case 'PT': // Portugal
      return uspsFirstClassPackageInternationalRate(24.50, 40.00, 55.50, weightoz)
    case 'ES': // Spain
    case 'SE': // Sweden
      return uspsFirstClassPackageInternationalRate(25.50, 41.00, 56.50, weightoz)
    case 'GB': // United Kingdom
      return uspsFirstClassPackageInternationalRate(26.00, 41.50, 57.00, weightoz)
    case 'BS': // Bahamas
    case 'BB': // Barbados
    case 'VG': // British Virgin Islands
    case 'JM': // Jamaica
      return uspsFirstClassPackageInternationalRate(26.50, 42.50, 58.50, weightoz)
    case 'BE': // Belgium
    case 'DK': // Denmark
    case 'FI': // Finland
    case 'IE': // Ireland
    case 'IT': // Italy
    case 'NL': // Netherlands
    case 'NO': // Norway
    case 'CH': // Switzerland
      return uspsFirstClassPackageInternationalRate(28.25, 45.75, 63.25, weightoz)
    case 'AU': // Australia
    case 'NZ': // New Zealand
      return uspsFirstClassPackageInternationalRate(29.75, 48.00, 66.25, weightoz)
    default: // shouldn't happen
      console.log("cart.js cartShipping() Country Not Found")
      return 0.00
  }
}

export const cartTotal = (cart, taxRate, country) => {
  const subtotal = cartSubtotal(cart)
  const salestax = cartSalesTax(cart, taxRate)
  const shipping = cartShipping(cart, country)
  const total = subtotal*1 + salestax*1 + shipping*1

  //console.log("cart.js cartTotal total", total.toFixed(2))

  return total
}
