import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { MDBCard, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput } from "mdbreact";

import Layout from "../components/layout"
import Seo from "../components/seo"

const InquirePage = ({ location }) => {
  const title = (location && location.state && location.state.title) ? location.state.title : ''

  const subj = (location && location.state && location.state.title && location.state.sku) ? `${location.state.title} (${location.state.sku})` : ''

  const item_img = (location && location.state && location.state.image) ? location.state.image : ''

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(subj)
  const [message, setMessage] = useState("Please tell me more about this item. Specifically, I'd like to know ")

  const valid = () => {
    if (fullname.length > 3 && email.length > 10 && message.length > 10) {
      return true
    } else {
      return false
    }
  }

  // Get token for sending secure email as soon as the component loads
  const [secureToken, setSecureToken] = useState('')
  useEffect(() => {
    const getSecureToken = async () => {
      try {
        const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "identifier": `${process.env.GATSBY_EMAIL_AGENT_IDENTIFIER}`,
            "password": `${process.env.GATSBY_EMAIL_AGENT_PASSWORD}`
          })
        })
        const data = await response.json()
        //console.log('contact useEffect data', data)
        setSecureToken(data.jwt)
      } catch (err) {
        console.log('contact useEffect err', err)
      }
    }
    getSecureToken()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    event.target.className += " was-validated"

    const sendEmail = async () => {
      try {
        await fetch(`${process.env.GATSBY_STRAPI_API_URL}/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${secureToken}`
          },
          body: JSON.stringify({
            "personalizations": [
              {
                "to": [
                  {
                    "email": "patrick@iartx.com",
                    "name": "Patrick Jamieson"
                  }
                ],
                "subject": `${subject}`
              }
            ],
            "content": [
              {
                "type": "text/plain",
                 "value": `${message}`
               }
             ],
             "from": {
               "email": "patrick@iartx.com",
               "name": "iArtX Item Inquiry"
             },
             "reply_to": {
               "email": `${email}`,
               "name": `${fullname}`
             }
           }
         )
        })
      } catch (err) {
        console.log('contact sendEmail err', err)
      }
    }
    sendEmail()

    // Go to MessageSentPage
    navigate('/sent/', { state: { subject } })
  }

  return (
  <Layout>
    <Seo title="Inquire" />
    <MDBContainer className="page-container contact">
      <h1 className="page-head">Inquire</h1>

      <MDBCard className="banner">
        <h2 className="text-center mx-auto pt-3">{title}</h2>
        <h3 className="text-center w-responsive mx-auto pb-3">
          Let us know what you'd like to know....
        </h3>
      </MDBCard>

      <MDBRow>
        <MDBCol md="4" className="text-center">
          <MDBCard>
            <GatsbyImage className="img-fluid rounded" image={item_img} alt={title} />
          </MDBCard>
        </MDBCol>
        <MDBCol md="8" className="md-0 mb-5">
          <MDBCard>
          <form onSubmit={(e) => handleSubmit(e)}>
            <MDBRow>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="contact-name" label="Your name" value={fullname} className="mt-4" required onChange={(event) => setFullname(event.target.value)} />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="email" id="contact-email" label="Your email" value={email} className="mt-4" required onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="contact-subject" label="Subject" value={subject} className="mt-4" required onChange={(event) => setSubject(event.target.value)} />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="md-form mb-0">
                  <MDBInput type="textarea" id="contact-message" label="Your message" value={message} className="mt-4" required onChange={(event) => setMessage(event.target.value)}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <div className="text-center">
              <MDBBtn type="submit" id="submit" color="primary" disabled={!valid()}>
                Send
              </MDBBtn>
            </div>
          </form>

          </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  </Layout>
)
}

export default InquirePage
