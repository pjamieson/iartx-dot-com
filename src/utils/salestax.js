// Function to get sales tax data from zip-tax.com's api (through a custom Strapi route)

export const getSalesTaxRate = async (zip) => {
  try {
    const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/orders/salestax`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"postal_code": zip})
    })
    const data = await response.json()
    //console.log("salestax.js getSalesTaxRate data", data)
    return data.taxSales
  } catch (err) {
    console.log('checkout getPaymentIntent err', err)
  }
}
