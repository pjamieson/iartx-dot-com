A Gallery website developed with React/Gatsby. Pulls content from the Strapi Headless CMS maintained in the pjamieson/iartx-strapi repository.

Code base based on code from the live blake-dot-art project, but with the latest versions of the packages used:

React 17:

Gatsby 3:

Strapi 3.5.3:

Bootstrap 5 and MDBBootstrap 5:
1) Updated Bootstrap version in package.json to latest
2) yarn add @popperjs/core@^2.5.4
3) added folowing to gatsby-browser.js
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import "mdbreact/dist/css/mdb.css"
import "./src/styles/scss/mdb-pro.scss"
