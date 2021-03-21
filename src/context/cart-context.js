import React, { createContext, useState } from "react"
import { getCart, saveCart } from "../utils/cart"

const defaultState = {
  isInCart: () => {},
  addToCart: () => {}
}
// Fixes issue as described at https://github.com/gatsbyjs/gatsby/issues/19255

export const CartContext = createContext(defaultState)

export default ({children}) => {

  const [cart, setCart] = useState(getCart)

  const isInCart = (cartItem) => {
    const indexOfItem = cart.findIndex(item =>
      item.identifier === cartItem.identifier
    )
    return indexOfItem !== -1 ? true : false
  }

  const addToCart = (cartItem, qty = 1) => {
    const cartCopy = [...cart]

    // Find identifier in Cart
    const indexOfItem = cartCopy.findIndex(item =>
      item.identifier === cartItem.identifier
    )

    if (indexOfItem !== -1 && cartCopy[indexOfItem].qty <= 0) {
      // safety (saw values under 0 following fast qty component clicking)
      cartCopy.splice(indexOfItem, 1)
    } else if (indexOfItem !== -1) {
      // Update qty
      cartCopy[indexOfItem].qty += parseInt(qty)

      if (cartCopy[indexOfItem].qty <= 0) {
        // Remove item from cart
        cartCopy.splice(indexOfItem, 1)
      }
    } else if (indexOfItem === -1) {
      // New item
      cartItem.qty = parseInt(qty)
      cartCopy.push(cartItem)
    }

    updateCart(cartCopy)
  }

  const updateCart = (updatedCart) => {
    setCart(updatedCart)
    saveCart(updatedCart)
  }

  const clearCart = () => {
    const emptyCart = []
    updateCart(emptyCart)
  }

  return (
    <CartContext.Provider value={{cart, isInCart, addToCart, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}
