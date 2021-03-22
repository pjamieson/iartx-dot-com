import React from 'react';
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDBContainer, MDBRow } from "mdbreact";

const ArtistInfo = ({ artist }) => {
  console.log("ArtistInfo artist", artist)

  const country = artist.country.name

  const birth_death = `(${artist.birth} - ${artist.death})`

  return (
    <MDBContainer className="subhead">
      <MDBRow>
        <h2>{country}</h2>
        <p>{birth_death}</p>
      </MDBRow>
    </MDBContainer>
  )
}

export default ArtistInfo;
