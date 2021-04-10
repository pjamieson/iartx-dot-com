// Functions to get formatted creator name

export const getCreatorFullName = (creator) => {
  //console.log("getCreatorFullName creator", creator)
  let name = ""
  if (creator.firstname && creator.firstname.length > 0) {
    name = creator.firstname
    if (creator.aka && creator.aka.length > 0) {
      name = `${name} "${creator.aka}"`
    }
    if (creator.lastname && creator.lastname.length > 0) {
      name = `${name} ${creator.lastname}`
    }
  } else {
    if (creator.lastname && creator.lastname.length > 0) {
      name = creator.lastname
    }
  }
  if (name.length === 0 && creator.aka && creator.aka.length > 0) {
    name = creator.aka
  }
  return name
}

export const getCreatorAlphaName = (creator) => {
  //console.log("getCreatorAlphaName creator", creator)
  let name = ""
  if (creator.lastname && creator.lastname.length > 0) {
    if (creator.firstname && creator.firstname.length > 0) {
      name = `${creator.lastname}, ${creator.firstname}`
    }
  } else {
    if (creator.firstname && creator.firstname.length > 0) {
      name = creator.firstname
    }
  }
  if (name.length === 0 && creator.aka && creator.aka.length > 0) {
    name = creator.aka
  }
  return name
}
