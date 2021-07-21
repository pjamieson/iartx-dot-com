import React, { useState, useContext } from "react"
import { Link } from "gatsby"

import { CartContext } from "../context/cart-context"

import SocialLinks from "../constants/sociallinks"

import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavItem
} from "mdbreact"

import logo from "../images/icon.png"

const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)

  return ( <>
    <div className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
      <div className="container">

        <MDBNavbarBrand>
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo" alt="Logo"/>
            <span className="brand-name">i</span>
            <span className="brand-name fat">Art</span>
            <span className="brand-name">X</span>
            <span className="brand-name dot">.</span>
            <span className="brand-name">com</span>
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <SocialLinks />
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav className="menu-options" right>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p>ART</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <li className="dropdown-submenu">
                    <a className="dropdown-item" tabindex="-1" href="#">Artists A - E</a>
                    <ul className="dropdown-menu">
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/aladin-agathe/">Aladin, Agathe</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/auguste-toussaint/">Auguste, Toussaint</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/benjamin-john/">Benjamin, John</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/bien-aime-gabriel/">Bien-Aimé, Gabriel</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/bigaud-wilson/">Bigaud, Wilson</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/bottex-seymour-e/">Bottex, Seymour E</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/caliste-canute/">Caliste, Canute</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/casimir-laurent/">Casimir, Laurent</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/desrosiers-m/">Desrosiers, M.</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/domond-wilmino/">Domond, Wilmino</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/duong-tran-huu/">Duong, Tran Huu</Link>
</MDBDropdownItem>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <a className="dropdown-item" tabindex="-1" href="#">Artists F - K</a>
                    <ul className="dropdown-menu">
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/francois-roger/">François, Roger</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/efdot-friedensohn-eric/">Friedensohn, Eric “Efdot”</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/hector-jean-voltaire/">Hector, Jean Voltaire</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/hung-pham-quoc/">Hùng, Phạm Quốc</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/arijac-jacques-harry/">Jacques, Harry “Arijac”</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/jamieson-blake/">Jamieson, Blake</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/jean-ulrick/">Jean, Ulrick M.</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/jean-jacques-carlo/">Jean-Jacques, Carlo</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/jose-hilome/">Jose, Hilome</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/joseph-reynald/">Joseph, Reynald</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/khanh-kao-van/">Khánh, Kao Vân</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/kuhlman-walter/">Kuhlman, Walter</Link>
</MDBDropdownItem>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <a className="dropdown-item" tabindex="-1" href="#">Artists L - Z</a>
                    <ul className="dropdown-menu">
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/louis-wilfrid/">Louis, Wilfrid</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/maurice-a-m/">Maurice, A.M.</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/obin-philome/">Obin, Philomé</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/pierre-andre/">Pierre, André</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/profil-jonas/">Profil, Jonas</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/rodriguez-maria-dolores/">Rodríguez, Maria Dolores</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/st-fleur-michelle/">St. Fleur, Michelle</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/stephane-micius/">Stephane, Micius</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/taylor-j/">Taylor, J.</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/thomas-kingsley/">Thomas, Kingsley</Link>
</MDBDropdownItem>
<MDBDropdownItem>
  <Link className="menu-link" to="/artists/zephirin-frantz/">Zéphirin, Frantz</Link>
</MDBDropdownItem>
                    </ul>
                  </li>
                  {/*<MDBDropdownItem>
                    <Link className="menu-link" to="/artists">Artists</Link>
                  </MDBDropdownItem>*/}
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/art/20th-century-art/">20th Century Art</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/art/caribbean-art/">Caribbean Art</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/art/haitian-art/">Haitian Art</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/art/sports-art/">Sports Art</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/art/vietnamese-art/">Vietnamese Art</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
              <MDBDropdownToggle nav>
                <div className="nav-menu-item">
                  <p>BOOKS</p>
                </div>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <li className="dropdown-submenu">
                  <a className="dropdown-item" tabindex="-1" href="#">Authors</a>
                  <ul className="dropdown-menu">
<MDBDropdownItem>
<Link className="menu-link" to="/authors/lefteri-christy/">Christy Lefteri</Link>
</MDBDropdownItem>
<MDBDropdownItem>
<Link className="menu-link" to="/authors/mittelholzer-edgar/">Mittelholzer, Edgar</Link>
</MDBDropdownItem>
                  </ul>
                </li>


                  <MDBDropdownItem>
                    <Link className="menu-link" to="/books/art-books/">Art Books</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/books/auction-catalogs/">Auction Catalogs</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/books/modern-lit/">Modern Lit</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/books/nordic-noir/">Nordic Noir</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/books/west-indian-lit/">West Indian Lit</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

            <MDBNavItem>
              {/*<Link className="nav-link" to="/topps/project2020/">
                <div className="nav-menu-item">
                  <p>TOPPS</p>
                  <p className="menu-sub">Project 2020</p>
                </div>
              </Link>*/}
              <MDBDropdown>
                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p>CARDS</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/cards/card-artists/">Card Artists</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/cards/card-series/">Card Series</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/cards/players/">Players</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p>ABOUT</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/collection/">Collection Notes</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/tech/">Tech Notes</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/shipping/">Packing & Shipping</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/contact/">Contact</Link>
                  </MDBDropdownItem>
                  {/*<MDBDropdownItem>
                    <Link className="menu-link" to="/about/team/">#TeamBlake</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/press/">Press</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/subscribe/">Mailing List</Link>
                  </MDBDropdownItem>*/}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

          </MDBNavbarNav>

        </MDBCollapse>
        <Link className="cart-link" to="/cart/">
          <MDBIcon className="cart-icon success-text" icon="shopping-cart" size="2x" />
          { (cart && cart.length > 0) &&
            <p className="cart-count">{cart.length}</p>
          }
        </Link>
      </div>
    </div></>
  )
}

export default Navbar
