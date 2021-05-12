import React from "react"
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaGithub
} from "react-icons/fa"
// FaFacebook,

const data = [
  {
    id: 1,
    icon: <FaFacebook className="social-icon fa-lg"></FaFacebook>,
    url: "https://www.facebook.com/JamiesonCollection",
  },
  {
    id: 2,
    icon: <FaGithub className="social-icon fa-lg"></FaGithub>,
    url: "https://github.com/pjamieson",
  },
  {
    id: 3,
    icon: <FaLinkedin className="social-icon fa-lg"></FaLinkedin>,
    url: "https://www.linkedin.com/in/patrick-react-jamieson/",
  },
  {
    id: 4,
    icon: <FaTwitter className="social-icon fa-lg"></FaTwitter>,
    url: "https://twitter.com/patrickjamieson",
  },
]

const links = data.map(link => {
  return (
    <li key={link.id}>
      <a href={link.url} className="social-link nav-link waves-effect waves-light" target="_blank" rel="noreferrer">
        {link.icon}
      </a>
    </li>
  )
})

// Above could be combined here, but this is easier to follow
export default ({ styleClass }) => {
  return (
    <ul className={`social-links ${styleClass ? styleClass : ""}`}>
      {links}
    </ul>
  )
}
