// Returns a valid image url or an empty string (prevents null value error)

export const getImageUrl = ( image, preferred_size ) => {
  //console.log("getImageUrl image", image)

  let image_url = ""
  if ( image ) {
    if (preferred_size === "large") {
      if ( image.formats && image.formats.large && image.formats.large.url ) {
        image_url = image.formats.large.url
      }
    }
    if (preferred_size === "medium") {
      if ( image.formats && image.formats.medium && image.formats.medium.url ) {
        image_url = image.formats.medium.url
      }
    }
    if (preferred_size === "small") {
      if ( image.formats && image.formats.small && image.formats.small.url ) {
        image_url = image.formats.small.url
      }
    }
    if (preferred_size === "thumbnail") {
      if ( image.formats && image.formats.thumbnail && image.formats.thumbnail.url ) {
        image_url = image.formats.thumbnail.url
      }
    }

    if (image_url === "") {
      if ( image.formats && image.formats.large && image.formats.large.url ) {
        image_url = image.formats.large.url
      }
      else if ( image.formats && image.formats.medium && image.formats.medium.url ) {
        image_url = image.formats.medium.url
      }
      else if ( image.formats && image.formats.small && image.formats.small.url ) {
        image_url = image.formats.small.url
      }
      else if ( image.url ) {
        image_url = image.url
      }
      else if ( image.formats && image.formats.thumbnail && image.formats.thumbnail.url ) {
        image_url = image.formats.thumbnail.url
      }
    }
  }
  //console.log("CardImageLinkTitle image_url", image_url)
  return image_url
}
