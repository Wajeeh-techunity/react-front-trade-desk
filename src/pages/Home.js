import SingleSlider from "../components/SingleSlider";
import MultiSlider from "../components/MultiSlider";
import TestimonialSlider from "../components/TestimonialSlider";
import SecBestPlatform from "../components/SecBestPlatform";
import { Container, Row, Col } from "react-bootstrap";
import SecVideo from "../components/SecVideo";
import SecNewsLetter from "../components/SecNewsletter";
import SecBestFeatures from "../components/SecBestFeatures";
import Register from "../components/Register";
import graphimages from "../components/graphimages";

function Home() {
  return (
    <>
      {/* <section className="BannerSlider">
    <Container fluid>
    <div id="banner_slide">
        <SingleSlider />
    </div>
    </Container>
</section> */}
      <section className="OurBestPlatform about_Sec">
        <SecBestPlatform />
      </section>
      <section className=" traders_sec">
        <Container>
          <h2 className="theme-h2 text-center">
            Trades we can find and share together
          </h2>
          <div className="row graph_row">
            <div className="graph_img">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">

                <img src="assets/images/01.png" />
              </button>
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="body-message">
                        <div className="row">
                          <div className="col-6 cont">
                            <h4>
                            Once SPOT broke this level, it rallied $3.00
                            </h4>
                          </div>
                          <div className="col-6 img_col">
                            <img src="assets/images/01.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="graph_img">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">

                <img src="assets/images/02.png" />
              </button>
              <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="body-message">
                        <div className="row">
                          <div className="col-6 cont">
                            <h4>
                            NIKE offered a strong sell opportunity on the daily charts, that same level was revisited and held multiple other times.
                            </h4>
                          </div>
                          <div className="col-6 img_col">
                            <img src="assets/images/02.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="graph_img">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3">

                <img src="assets/images/03.png" />
              </button>
              <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="body-message">
                        <div className="row">
                          <div className="col-6 cont">
                            <h4>
                            A great short term scalping tool is the convergence of multiple Moving
Averages. The below example in DELL led to a move of over $1.5. The stop
loss can be trailed with one of the averages

                            </h4>
                          </div>
                          <div className="col-6 img_col">
                            <img src="assets/images/03.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* <section className="BestFeatures">
        <Container>
        <div className="section-title">
            <Row className="align-items-center">
            <Col sm={12} md={8} lg={8}>
            <h2 className="theme-h2 ">
            trades we can find and share together
            </h2>
            </Col>
            <Col lg={4} md={4} sm={12}>
            <p className="theme-para">
                Here our features that we present to make it easier for each
                of our users <a href="#">Let’s know more</a>
            </p>
            </Col>
            </Row>
        </div>
        <Row>
        <SecBestFeatures
        title="Easy Payment"
        description="Easier payments with many options to sell or buy in our
        transactions"
        src="assets/images/security.png"
        />
        <SecBestFeatures
        title="High Security"
        description="Security system with high technology and encryption of every"
        src="assets/images/payment.png"
        />
        <SecBestFeatures
        title="Best Ecosystem"
        description="The services we provide with full support for the
        convenience of our"
        src="assets/images/ecosystem.png"
        />
        </Row>
        </Container>
    </section> */}
      {/*<section className="VideoSec">*/}
      {/*    <SecVideo />*/}
      {/*</section>*/}
      {/*<section className="CurrencySec">*/}
      {/*    <Container>*/}
      {/*        <div className="section-title">*/}
      {/*            <h2 className="theme-h2">Top Forex Currency</h2>*/}
      {/*            <p className="theme-para">*/}
      {/*                Here are the most popular forex assets and you must have for*/}
      {/*                investment <a href="#">Let’s know more</a>*/}
      {/*            </p>*/}
      {/*        </div>*/}
      {/*    </Container>*/}
      {/*    <Container fluid>*/}
      {/*        <div id="currency_slider" className="owl-carousel owl-theme">*/}
      {/*            <MultiSlider />*/}
      {/*        </div>*/}
      {/*        <div className="slideState">*/}
      {/*            <span></span>*/}
      {/*        </div>*/}
      {/*    </Container>*/}
      {/*</section>*/}
      {/*<section className="TestimonialSec">*/}
      {/*    <Container>*/}
      {/*        <div className="section-title">*/}
      {/*            <h2 className="theme-h2">*/}
      {/*                Testimonials From Our <br /> Platform Users*/}
      {/*            </h2>*/}
      {/*        </div>*/}
      {/*        <div id="testimonial_slider" className="testimonial_slider">*/}
      {/*            <TestimonialSlider />*/}
      {/*        </div>*/}
      {/*    </Container>*/}
      {/*</section>*/}
      <section className="NewsletterSec">
        {/* <SecNewsLetter /> */}
      </section>
    </>
  );
}
export default Home;
