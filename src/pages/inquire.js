import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"

import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTextArea } from "mdb-react-ui-kit";

import Layout from "../components/layout"
import Seo from "../components/seo"

const InquirePage = ({ location }) => {
  const title = (location && location.state && location.state.title) ? location.state.title : ''

  const subj = (location && location.state && location.state.title && location.state.sku) ? `${location.state.title} (${location.state.sku})` : ''

  const image_src = (location && location.state && location.state.image_src) ? location.state.image_src : ''

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const subject = subj // will not be edited
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
                "subject": `${subj}`
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
    navigate('/sent/', { state: { subj } })
  }

  return (
    <Layout>
      <Seo title="Inquire" />
      <MDBContainer className="page-container inquire">
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
              <img className="img-fluid rounded" src={image_src} alt={title} />
            </MDBCard>
          </MDBCol>
          <MDBCol md="8" className="md-0 mb-5">
            <MDBCard>
            <form onSubmit={(e) => handleSubmit(e)}>
              <MDBRow>
                <MDBCol md="6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="contact-name"
                      wrapperClass="mb-3 me-1"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      label="Your Name*"
                      validation="invalid"
                      invalid
                      required
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="email"
                      id="contact-email"
                      wrapperClass="mb-3 me-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Your Email*"
                      validation="invalid"
                      invalid
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="contact-subject"
                      wrapperClass="mb-3 me-1"
                      value={subject}
                      label="Subject"
                      disabled
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <div className="md-form mb-0">
                    <MDBTextArea
                      id="contact-message"
                      label="Your message"
                      value={message}
                      className="mt-4"
                      rows={4}
                      onChange={(e) => setMessage(e.target.value)}
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
