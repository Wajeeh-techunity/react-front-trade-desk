import { Container, Row, Col } from 'react-bootstrap';

function SecBestPlatform() {
  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={6} sm={12}>
            <div className="PlatformImg">
              <img src="assets/images/about_sec.jpg" />
            </div>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <div className="PlatformCon changes_platform">
              <h2 className="theme-h2">Your Trading Room is an interactive site for independent traders</h2>
              {/* <div id="projectFacts" className="sectionclassName">
                <div className="fullWidth eight columns">
                  <div className="projectFactsWrap ">
                    <div
                      className="item wow fadeInUpBig animated animated"
                      data-number="12"
                      style={{ visibility: 'visible ' }}
                    >
                      <p>Our Users</p>
                      <p id="number1" className="number">
                        12 <span>M+</span>
                      </p>
                    </div>
                    <div
                      className="item wow fadeInUpBig animated animated"
                      data-number="55"
                      style={{ visibility: 'visible ' }}
                    >
                      <p>Active Transaction</p>
                      <p id="number2" className="number">
                        55
                      </p>
                    </div>
                    <div
                      className="item wow fadeInUpBig animated animated"
                      data-number="359"
                      style={{ visibility: 'visible ' }}
                    >
                      <p>Brand Partner</p>
                      <p id="number3" className="number">
                        359
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              <p>
                Trading alone can be difficult, at YTR, you can join in discussion groups about what stocks are being traded and what strategies are being employed.
              </p>
              <p>
                Create your own groups that may be more specific to the products you trade or the style; swing traders, scalpers, etc.
              </p>
              <p>
                Don’t go it alone!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SecBestPlatform;
