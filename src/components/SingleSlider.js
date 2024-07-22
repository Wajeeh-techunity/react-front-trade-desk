import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../components/SwiperCustom.css';

export default function App(prop) {
  return (
    <>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="item">
            <Row className=" align-items-center">
              <Col lg={5} md={5} sm={12}>
                <div className="BannerContent">
                  {/* <h1>
                    Best Way To Buy And Sell <br /> Your Trades
                  </h1> */}
                  <h4>
                  Once SPOT broke this level, it rallied$3.00
                  </h4>
                  <div className="theme-btn">
                  <Link className="vc_general" to="/stocks">
                      See Details <img src="assets/images/btn-bf.png" />
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={7} md={7} sm={12}>
                <div className="BannerImage">
                  <img src="assets/images/01.png" />
                </div>
              </Col>
            </Row>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <Row className=" align-items-center">
              <Col lg={5} md={5} sm={12}>
                <div className="BannerContent">
                  {/* <h1>
                    Best Way To Buy And Sell <br /> Your Trades
                  </h1> */}
                  <h4>
                  NIKE offered a strong sell opportunity on the daily charts, that same level was revisited and held multiple other times
                   </h4>
                  <div className="theme-btn">
                  <Link className="vc_general" to="/stocks">
                      See Details <img src="assets/images/btn-bf.png" />
                      </Link>
                  </div>
                </div>
              </Col>
              <Col lg={7} md={7} sm={12}>
                <div className="BannerImage">
                  <img src="assets/images/02.png" />
                </div>
              </Col>
            </Row>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-5 col-sm-12">
                <div className="BannerContent">
                  {/* <h1>
                    Best Way To Buy And Sell <br /> Your Trades
                  </h1> */}
                  <h4>
                  A great short term scalping tool is the
convergence of multiple Moving
Averages. The below example in DELL
led to a move of over $1.5. The stop
loss can be trailed with one of the
averages
                  </h4>
                  <div className="theme-btn">                    
                  <Link className="vc_general" to="/stocks">
                      See Details <img src="assets/images/btn-bf.png" />
                      </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12">
                <div className="BannerImage">
                  <img src="assets/images/03.png" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
