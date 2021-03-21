// Functions to get and set inventory availability

export const getPaintingQtyAvailable = async (id) => {
  try {
    const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/paintings/${id}`)
    const data = await response.json()
    return (data.qty)
  } catch (err) {
    console.log('getPaintingQtyAvailable err', err)
  }
  return 0
}

export const setPaintingQtyAvailable = async (id, qty) => {
    try {
      await fetch(`${process.env.GATSBY_STRAPI_API_URL}/paintings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: `{"qty":${qty}}`
      })
    } catch (err) {
      console.log("inventory setPaintingQtyAvailable err", err)
    }
}

export const getCardQtyAvailable = async (id) => {
  try {
    const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/tradingcards/${id}`)
    const data = await response.json()
    return (data.qty)
  } catch (err) {
    console.log('getCardQtyAvailable err', err)
  }
  return 0
}

export const setCardQtyAvailable = async (id, qty) => {
    try {
      await fetch(`${process.env.GATSBY_STRAPI_API_URL}/tradingcards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: `{"qty":${qty}}`
      })
    } catch (err) {
      console.log("inventory setCardQtyAvailable err", err)
    }
}

export const getProductQtyAvailable = async (id) => {
  try {
    const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/products/${id}`)
    const data = await response.json()
    return (data.qty)
  } catch (err) {
    console.log('getProductQtyAvailable err', err)
  }
  return 0
}

export const setProductQtyAvailable = async (id, qty) => {
    try {
      await fetch(`${process.env.GATSBY_STRAPI_API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: `{"qty":${qty}}`
      })
    } catch (err) {
      console.log("inventory setProductQtyAvailable err", err)
    }
}
