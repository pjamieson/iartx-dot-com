
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

// Functions below replicated in blake-strapi/config/functions/cart.js
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

export const cartShipping = (cart) => {
  return 0.00 // For now, all shipping is free
}

export const cartTotal = (cart, taxRate) => {
  const subtotal = cartSubtotal(cart)
  const salestax = cartSalesTax(cart, taxRate)
  const shipping = cartShipping(cart)
  const total = subtotal*1 + salestax*1 + shipping*1

  //console.log("cart.js cartTotal total", total.toFixed(2))

  return total
}
