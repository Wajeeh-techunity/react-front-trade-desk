import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SecVideo() {
  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={6} sm={12}>
            <div className="PlatformCon">
              <h2 className="theme-h2">Learn More Tips In Our Transactions</h2>
              <p>
                We provide various tutorials in the form of videos <br />{' '}
                specifically for our users to be able to maximize our
              </p>
              <div className="theme-btn">
                <a className="vc_general" href="#">
                  See Details <img src="assets/images/btn-bf02.png" />
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="PlatformImg">
              <img src="assets/images/tips-img.png" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SecVideo;
