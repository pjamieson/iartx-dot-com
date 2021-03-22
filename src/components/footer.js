import React from "react"
import { Link } from "gatsby"
import SocialLinks from "../constants/sociallinks"

const Footer = () => {
  return (
    <footer className="blake-footer font-small mt-2">
      <div className="footer-copyright text-center py-3">
        <div>
          <SocialLinks styleClass="footer-links"></SocialLinks>
        </div>
        <div className="site-links">
          <Link className="" to="/privacy-policy/">Privacy Policy</Link>
          <Link className="" to="/terms/">Terms & Conditions</Link>
        </div>
        <div>
          <span className="muted">Created by{" "}</span>
          <a href="https://patrickjamieson.com" target="_blank" rel="noopener noreferrer">
            Patrick Jamieson
          </a>{" "}
          <span className="muted">- Copyright © {new Date().getFullYear()} Blake Jamieson LLC. All rights reserved. - </span>
          <Link className="" to="/admin/orders"> Stay Awesome!</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
