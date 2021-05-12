import React, { useState } from "react"
import { Link } from "gatsby"

import {
  MDBSideNav,
  MDBInput,
  MDBSideNavNav,
  MDBSideNavCat,
  MDBSideNavItem
} from "mdbreact";

import logo from "../images/icon.png"

const Sidenav = () => {
  const [isSideOpen, setIsSideOpen] = useState(true)

  return (
    <MDBSideNav
      fixed slim
      logo={logo}
      href="/"
      triggerOpening={isSideOpen}
      breakWidth={700}
    >
      <MDBSideNavNav>

        <MDBSideNavCat name="Artists A - E" id="artists-a-e" icon="palette">
          <MDBSideNavItem>
            <Link to="/artists/aladin-agathe">Aladin, Agathe</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/auguste-toussaint">Auguste, Toussaint</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/benjamin-john">Benjamin, John</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/bien-aime-gabriel">Bien-Aimé, Gabriel</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/bigaud-wilson">Bigaud, Wilson</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/bottex-seymour-e">Bottex, Seymour E</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/caliste-canute">Caliste, Canute</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/casimir-laurent">Casimir, Laurent</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/chery-jacques-richard">Chéry, Jacques-Richard</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/desrosiers-m">Desrosiers, M.</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/domond-wilmino">Domond, Wilmino</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/duong-tran-huu">Duong, Tran Huu</Link>
          </MDBSideNavItem>
        </MDBSideNavCat>
        <MDBSideNavCat name="Artists F - L" id="artists-f-l" icon="palette">
          <MDBSideNavItem>
            <Link to="/artists/francois-roger">François, Roger</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/efdot-friedensohn-eric">Friedensohn, Eric "Efdot"</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/hector-jean-voltaire">Hector, Jean Voltaire</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/hung-pham-quoc">Hùng, Phạm Quốc</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/jamieson-blake">Jamieson, Blake</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/jean-ulrick">Jean, Ulrick M.</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/jean-jacques-carlo">Jean-Jacques, Carlo</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/jose-hilome">Jose, Hilome</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/joseph-reynald">Joseph, Reynald</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/khanh-kao-van">Khánh, Kao Vân</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/kuhlman-walter">Kuhlman, Walter</Link>
          </MDBSideNavItem>
        </MDBSideNavCat>
        <MDBSideNavCat name="Artists M - Z" id="artists-m-z" icon="palette">
          <MDBSideNavItem>
            <Link to="/artists/maurice-a-m">Maurice, A.M.</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/obin-philome">Obin, Philomé</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/pierre-andre">Pierre, André</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/profil-jonas">Profil, Jonas</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/rodriguez-maria-dolores">Rodríguez, Maria Dolores</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/st-fleur-michelle">St. Fleur, Michelle</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/stephane-micius">Stephane, Micius</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/taylor-j">Taylor, J.</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/thomas-kingsley">Thomas, Kingsley</Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/artists/zephirin-frantz">Zéphirin, Frantz</Link>
          </MDBSideNavItem>
        </MDBSideNavCat>

      </MDBSideNavNav>

    </MDBSideNav>

    )
}

export default Sidenav;
