import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SecBestFeatures from '../components/SecBestFeatures';
import { Container, Row, Col } from 'react-bootstrap';
import SecVideo from '../components/SecVideo';
import SecBestPlatform from '../components/SecBestPlatform';

function About() {
  return (
    <>
      <section className="breadcrumbs">
        <Breadcrumbs pageTitle="About Us" />
      </section>
      <section className="OurBestPlatform">
        <SecBestPlatform />
      </section>
      {/*<section className="BestFeatures">*/}
      {/*  <Container>*/}
      {/*    <div className="section-title">*/}
      {/*      <Row className="align-items-center">*/}
      {/*        <Col sm={12} md={8} lg={8}>*/}
      {/*          <h2 className="theme-h2">*/}
      {/*            Best Features For Users Convenience*/}
      {/*          </h2>*/}
      {/*        </Col>*/}
      {/*        <Col lg={4} md={4} sm={12}>*/}
      {/*          <p className="theme-para">*/}
      {/*            Here our features that we present to make it easier for each*/}
      {/*            of our users <a href="#">Let’s know more</a>*/}
      {/*          </p>*/}
      {/*        </Col>*/}
      {/*      </Row>*/}
      {/*    </div>*/}
      {/*    <Row>*/}
      {/*      <SecBestFeatures*/}
      {/*        title="Easy Payment"*/}
      {/*        description="Easier payments with many options to sell or buy in our*/}
      {/*              transactions"*/}
      {/*        src="assets/images/security.png"*/}
      {/*      />*/}
      {/*      <SecBestFeatures*/}
      {/*        title="High Security"*/}
      {/*        description="Security system with high technology and encryption of every"*/}
      {/*        src="assets/images/payment.png"*/}
      {/*      />*/}
      {/*      <SecBestFeatures*/}
      {/*        title="Best Ecosystem"*/}
      {/*        description="The services we provide with full support for the*/}
      {/*              convenience of our"*/}
      {/*        src="assets/images/ecosystem.png"*/}
      {/*      />*/}
      {/*    </Row>*/}
      {/*  </Container>*/}
      {/*</section>*/}
      {/*<section className="VideoSec">*/}
      {/*  <SecVideo />*/}
      {/*</section>*/}
    </>
  );
}

export default About;
