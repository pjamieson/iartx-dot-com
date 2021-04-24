import React from 'react';

import { MDBCard, MDBCardBody } from "mdbreact"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SuccessPage = ({ location }) => {
  const firstname = (location && location.state && location.state.firstname) ? location.state.firstname : ''

  return (
    <Layout>
      <Seo title="Order Processed" />
        <div className="container page-container success">
          <h1 className="page-head">Order Processed</h1>
          <MDBCard>
            <MDBCardBody>
              <h2 className='mt-1 text-center'>
                {firstname.length > 0 &&
                  `Thanks, ${firstname}!`
                }
                {!firstname.length >0 &&
                  `Thanks!`
                }
              </h2>
              <p className="mb-4 lead">Order Confirmation email sent.</p>
            </MDBCardBody>
          </MDBCard>
        </div>
    </Layout>
  )
}

export default SuccessPage;
