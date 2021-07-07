import React from 'react';

import { MDBCard, MDBCardBody } from "mdbreact"

import Layout from "../components/layout"
import Seo from "../components/seo"

const MessageSentPage = ({ location }) => {
  const subject = (location && location.state && location.state.subject) ? location.state.subject : ''

  return (
    <Layout>
      <Seo title="Message Sent" />
        <div className="container page-container success">
          <h1 className="page-head">Message Sent</h1>
          <MDBCard>
            <MDBCardBody>
              <h2 className='mt-1 text-center'>
                {subject.length > 0 &&
                  `Subject: ${subject}`
                }
              </h2>
              <p className="mb-4 lead">Message sent. You will be hearing from us soon.</p>
            </MDBCardBody>
          </MDBCard>
        </div>
    </Layout>
  )
}

export default MessageSentPage;
