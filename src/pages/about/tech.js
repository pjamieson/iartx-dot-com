import React from "react"

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const TechNotesPage = () => {

  return (
    <Layout>
      <Seo title="Tech Notes" />
      <div className="container page-container notes">
        <h1>Tech Notes</h1>
        <MDBCard>
          <MDBCardBody>
            <p>I (Patrick Jamieson) am a book collector, an art collector and, by profession, a computer programmer. I own the websites iArtX.com, iBookX.com, and WestIndiesBooks.com. Over the years, these three sites have served as my professional training and testing grounds, allowing me to expand my personal web development skills set. The following is a somewhat technical description of the evolution of those sites, and is probably only of interest to other web developers.</p>

            <p><strong>WestIndiesBooks.com</strong> was initially developed in 1997 as a single, static HTML page that listed books by West Indian Authors. At that time, professionally, I was developing Windows applications in C++. That initial release of WestIndiesBooks.com was my first hands-on experience with HTML and web development.</p>

            <p>In 2002, I completely re-wrote WestIndiesBooks.com as an ASP.NET site. The primary language was C#, and the book data was moved into an XML file. This allowed dynamic sorting and filtering of the booklist, based on user-entered criteria. Subsequently, I added the Haitian Art features: An index of artists that was included on every page in the site, and individual ASPX pages for each artist.</p>

            <p>The current WestIndiesBooks.com site is the result of another complete re-write in late 2013. The base platform is now AngularJS, and the data is now in JSON files, thus eliminating any need for external data requests. The Artist Index and Artist Detail views are each single AngularJS HTML partials that are populated dynamically from the JSON data, based on user interaction. Content changes do not require modification of any of the JavaScript or HTML; adding, updating, or removing any authors, books, artists, or paintings is accomplished by adding or editing JSON files.</p>

            <p>January 2014 saw the launch of this site, <strong>iArtX.com</strong>. Initially, it had the same Haitian Art content then found on WestindiesBooks.com, but not the West Indian Literature content. Like WestIndiesBoks.com, it was a static site that read its data from JSON files.</p>

            <p>In the Spring of 2021, I did a complete re-write of iArtX.com, modeled in large part after the site I developed for my son, the artist Blake Jamieson, which launched in mid 2020 at https://blake.art. The iArtX.com site is now a React/Gatsby site, developed with Javascript. Rather than a static site hosted on AWS S3, it is now a dynamic site, built and deployed through Gatsby Cloud, and fed up-to-the-minute inventory data from a custom Strapi CMS backend. It also newly supports PCI-compliant credit card payment processing and other eCommerce features. In addition to the art content, sections for the sale of books and sports trading cards have been added. This allows me to offer the three main types of collectables that I buy and sell on one web site, backed by one database, one Content Management System, and one cart/checkout component.</p>

            <p>The source code for each of my sites is freely available at https://github.com/pjamieson.</p>
          </MDBCardBody>
        </MDBCard>
      </div>
    </Layout>
  )
}

export default TechNotesPage
