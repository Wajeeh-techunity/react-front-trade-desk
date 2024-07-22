import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";

function Footer() {
  return (
    <>
      <footer id="theme-footer">
        <Container>
          <Row>

            <Col lg={4} md={4} sm={12}>
              <h3>Information</h3>
              <ul>
                <li>
                <Link className="" to="/register">
                  Sign Up
                </Link>
                </li>
                <li>
                  <Link className="" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <h3>Platform</h3>
              <ul>
                <li>
                  <Link className="" to="/contact">
                    Contact
                  </Link>
                </li>
                {/* <li>
                  <a href="javascript:void(0);">Partnership</a>
                </li> */}
              </ul>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <h3>About</h3>
              <p>
                Stay connected with us and let's know more about Forex and more
                explorer us on this
              </p>
              <ul className="footer-icons">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;