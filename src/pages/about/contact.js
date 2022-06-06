import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBInput,
  MDBTextArea
} from "mdb-react-ui-kit";

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const ContactPage = () => {

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const valid = () => {
    if (fullname.length > 3 && email.length > 10 && subject && message.length > 10) {
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
               "name": "iArtX Contact Page"
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
    <Seo title="Contact Us" />
    <MDBContainer className="page-container contact">
      <h1 className="page-head">Contact Us</h1>

      <MDBCard className="banner">
        <h2 className="text-center mx-auto pt-3">
          Thoughts? Comment? Suggestion? Request?
        </h2>
        <h3 className="text-center w-responsive mx-auto pb-3">
          Don't keep it to yourself. We'd love to hear from you!
        </h3>
      </MDBCard>

      <MDBRow>
        <MDBCol md="8" className="md-0 mb-5">
          <MDBCard>
          <form onSubmit={(e) => handleSubmit(e)}>
            <MDBRow>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="contact-name" label="Your name*" value={fullname} className="mt-4" required onChange={(event) => setFullname(event.target.value)} />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div className="md-form mb-0">
                  <MDBInput type="email" id="contact-email" label="Your email*" value={email} className="mt-4" required onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="md-form mb-0">
                  <MDBInput type="text" id="contact-subject" label="Subject*" value={subject} className="mt-4" required onChange={(event) => setSubject(event.target.value)} />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="md-form mb-0">
                  <MDBTextArea id="contact-message" label="Your message*" value={message} className="mt-4" rows={4} required onChange={(event) => setMessage(event.target.value)}
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
        <MDBCol md="4" className="text-center">
          <MDBCard>
          <ul className="list-unstyled mb-0">
            <li>
              <div className="btn-floating">
                <MDBIcon icon="map-marker-alt" />
              </div>
              <p className="contact-info-street">1848 Indian Valley Rd</p>
              <p className="contact-info">Novato, CA, USA</p>
            </li>
            {
            <li>
              <div className="btn-floating">
                <MDBIcon icon="phone" />
              </div>
              <p className="contact-info">1.415.897.8145</p>
            </li>
            }
            <li>
              <div className="btn-floating">
                <MDBIcon icon="envelope" />
              </div>
              <p className="contact-info">patrick@iartx.com</p>
            </li>
          </ul>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  </Layout>
)
}

export default ContactPage
