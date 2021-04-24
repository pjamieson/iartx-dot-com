import React from 'react';
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDBContainer, MDBRow } from "mdbreact";

const ArtistInfo = ({ artist }) => {
  //console.log("ArtistInfo artist", artist)

  const country = artist.country.name

  let birth_death = "( "
  if (artist.birth) {birth_death += artist.birth}
  birth_death += " - "
  if (artist.death) {birth_death += artist.death}
  birth_death += " )"

  return (
    <MDBContainer className="subhead">
      <MDBRow>
        <h2>{country}</h2>
        { (artist.birth || artist.death) && <p>{birth_death}</p> }
      </MDBRow>
    </MDBContainer>
  )
}

export default ArtistInfo;
