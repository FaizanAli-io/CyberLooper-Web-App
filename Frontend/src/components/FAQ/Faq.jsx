import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAccordion,
  MDBAccordionItem,
  MDBBtn,
} from "mdb-react-ui-kit";

const FAQPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center max-vh-100 bg-light">
      <MDBContainer className="py-5">
        <h3 className="text-center mb-4 fw-bold">Frequently Asked Questions</h3>
        <MDBRow className="d-flex justify-content-center align-items-center">
          {/* Left Column - FAQ Section */}
          <MDBCol md="6">
            <MDBAccordion flush>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="How does the Single Use license work?"
              >
                The Single Use license allows you to use the product for one
                project only.
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={2}
                headerTitle="I already have other MDB products, do I get a discount?"
              >
                Yes! We offer special discounts for existing customers. Contact
                support for details.
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={3}
                headerTitle="What is Priority Support?"
              >
                Priority Support ensures faster response times and dedicated
                support from our team.
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={4}
                headerTitle="I have a technical question"
              >
                If you have a technical question, feel free to reach out through
                our support portal.
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={5}
                headerTitle="Content Security Policy (CSP)"
              >
                Our product follows strict CSP guidelines to ensure security and
                compliance.
              </MDBAccordionItem>
            </MDBAccordion>
          </MDBCol>

          {/* Right Column - Contact Options */}
          <MDBCol md="4" className="text-center">
            <h5 className="fw-bold mb-3">Still have questions?</h5>
            <div className="mb-3">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Others/faq.webp"
                alt="FAQ Image"
                className="img-fluid rounded"
              />
            </div>
            <MDBBtn color="primary" block className="mb-2">
              I HAVE A TECHNICAL QUESTION
            </MDBBtn>
            <MDBBtn color="light" block>
              I HAVE A PRODUCT-RELATED QUESTION
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default FAQPage;
