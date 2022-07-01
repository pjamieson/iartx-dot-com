import React from 'react';

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const ReturnsPage = () => {
  return (
    <Layout>
      <Seo title="Returns Policy" />
        <div className="container page-container team">
          <h1 className="page-head">Returns Policy</h1>
          <MDBCard>
            <MDBCardBody>
              <h2>It's simple...</h2>

              <p>We pack carefully and well, and ship promptly upon clearance of full payment, typically within one business day.</p>

              <p><b>We accept returns within 30 days for any reason.</b> If returning an item, please pack it as we did, using the same materials we used to pack it for shipment to you.</p>

              <p>If any item you purchase from us is not as described, we will fully refund all charges, including sales tax and shipping. Otherwise, we will refund the full price you paid, plus any sales taxes paid, but not the original shipping charge.</p>

            </MDBCardBody>
          </MDBCard>
        </div>
    </Layout>
  )
}

export default ReturnsPage
