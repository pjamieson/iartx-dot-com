import { getImage } from "gatsby-plugin-image"

export const getGatsbyImage = (url) => {
  console.log("getGatsbyImage url", url)
  try {
    fetch(new URL(url))
      .then(response => response.blob())
      .then(blob => {
        console.log("getGatsbyImage blob", blob)
        getImage(blob)
      })
      .then(image => {
        console.log("getGatsbyImage image", image)
        return image
      })
  } catch (err) {
    console.log('getGatsbyImage err', err)
  }
}

/*const url = new URL(item.images[0].url)
console.log("FeaturedImagelink url", url)
const image = async () => {
  await getGatsbyImage(url)
}*/
