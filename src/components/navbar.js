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
  MDBNavItem,
} from "mdbreact"

import logo from "../images/icon.png"

const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
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
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/artists/">Artists</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/haitian-art/">Haitian Art</Link>
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
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/athlete-portraits/">Authors</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/pop-art/">Countries</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/prints/">West Indian Lit</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/abstracts/">Art Books</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/b206/">Auction Catalogs</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/collabs/">Scandinavian Noir</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/painted-objects/">Modern Lit</Link>
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
                    <Link className="menu-link" to="/topps/project2020/">Artists</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/1951/">Series</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/">Players</Link>
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
                    <Link className="menu-link" to="/about/team/">#TeamBlake</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/press/">Press</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/contact/">Contact</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/subscribe/">Mailing List</Link>
                  </MDBDropdownItem>
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
    </div>
  )
}

export default Navbar
