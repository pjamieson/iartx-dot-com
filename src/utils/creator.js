// Functions to get formatted creator name

export const getCreatorFullName = (creator) => {
  //console.log("getCreatorFullName creator", creator)
  let name = ""
  if (creator.aka && creator.aka.length > 0) {
    name = creator.aka
  }
  if (creator.firstname && creator.firstname.length > 0) {
    name = creator.firstname
    if (creator.aka && creator.aka.length > 0) {
      // Google Search not liking “ ” - Replaced with '' by PAJ 7/15/21
      name = `${name} '${creator.aka}'`
    }
    if (creator.lastname && creator.lastname.length > 0) {
      name = `${name} ${creator.lastname}`
    }
  }

  return name
}

export const getCreatorAlphaName = (creator) => {
  //console.log("getCreatorAlphaName creator", creator)
  let name = ""
  if (creator.aka && creator.aka.length > 0) {
    name = creator.aka
  }
  if (creator.lastname && creator.lastname.length > 0) {
    name = creator.lastname
    if (creator.firstname && creator.firstname.length > 0) {
      name = `${creator.lastname}, ${creator.firstname}`
    }
    if (creator.aka && creator.aka.length > 0) {
      name = `${name} '${creator.aka}'`
    }
  }

  return name
}
