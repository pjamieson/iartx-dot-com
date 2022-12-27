import React, { useState, useContext } from "react"
import { Link } from "gatsby"

import { CartContext } from "../context/cart-context"

//import SocialLinks from "../constants/sociallinks"

import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler
} from "mdb-react-ui-kit"

import logo from "../images/icon.png"

const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return ( <>
    <MDBNavbar sticky expand="md" dark bgColor="dark">
      <MDBContainer fluid>

        <Link to="/" className="navbar-brand">
          <img src={logo} className="logo" alt="Logo"/>
          <span className="brand-name">i</span>
          <span className="brand-name fat">Art</span>
          <span className="brand-name">X</span>
          <span className="brand-name dot">.</span>
          <span className="brand-name">com</span>
        </Link>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={isCollapsed}>

          <MDBNavbarNav left>
            <MDBNavbarItem>
              {/*<SocialLinks />*/}
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
          <div className="menu-items">
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle>
                  <div className="nav-menu-item">
                    <p>ART</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdown dropright>
                    <MDBDropdownToggle>Artists A - D</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/aladin-agathe/">Aladin, Agathe</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/arijac-jacques-harry/">Arijac (Harry Jacques)</Link>
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
                    </MDBDropdownMenu>
                  </MDBDropdown>

                  <MDBDropdown dropright>
                    <MDBDropdownToggle>Artists E - K</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/efdot-friedensohn-eric/">Efdot (Eric Friedensohn)</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/francois-roger/">François, Roger</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/hector-jean-voltaire/">Hector, Jean Voltaire</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/hung-pham-quoc/">Hùng, Phạm Quốc</Link>
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
                        <Link className="menu-link" to="/artists/joseph-reynald/">Joseph, Reynald</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/khanh-kao-van/">Khánh, Kao Vân</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/kuhlman-walter/">Kuhlman, Walter</Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>

                  <MDBDropdown dropright>
                    <MDBDropdownToggle>Artists L - Z</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/louis-wilfrid/">Louis, Wilfrid</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/maurice-a-m/">Maurice, A.M.</Link>
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
                        <Link className="menu-link" to="/artists/taylor-j/">Taylor, J.</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/thomas-kingsley/">Thomas, Kingsley</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/artists/zephirin-frantz/">Zéphirin, Frantz</Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>

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
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle>
                  <div className="nav-menu-item">
                    <p>BOOKS</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdown dropright>
                    <MDBDropdownToggle>Authors</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/authors/jonasson-ragnar/">Jónasson, Ragnar</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/authors/lefteri-christy/">Leferti, Christy</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/authors/mittelholzer-edgar/">Mittelholzer, Edgar</Link>
                      </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
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
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle>
                  <div className="nav-menu-item">
                    <p>CARDS</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/cards/card-artists/">Cards by Artist</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/cards/players/">Cards by Player</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/cards/card-series/">Cards by Series</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle>
                  <div className="nav-menu-item">
                    <p>TYPEWRITERS</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/typewriters/gossen-typewriter/">Gossen</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/typewriters/hermes-typewriter/">Hermes</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/typewriters/remington-typewriter/">Remington</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle>
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
                    <Link className="menu-link" to="/about/returns/">Return Policy</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/contact/">Contact</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </div>
          </MDBNavbarNav>

        </MDBCollapse>

        <Link className="cart-link" to="/cart/">
          <MDBIcon className="cart-icon success-text" icon="shopping-cart" size="2x" />
          { (cart && cart.length > 0) &&
            <p className="cart-count">{cart.length}</p>
          }
        </Link>

      </MDBContainer>
    </MDBNavbar></>
  )
}

export default Navbar
