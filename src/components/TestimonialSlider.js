import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function App({ name, designation, reviewText, src }) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        navigation={true}
        pagination={{
          type: 'fraction',
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="item">
            <div className="testimonialmain">
              <div className="star-rating">
                <ul>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                </ul>
              </div>
              <div className="FirstPara">
                <p>
                  Is the best crypto asset trading <br /> platform that I have
                  ever used,{' '}
                </p>
              </div>
              <div className="testimonialbox">
                <div className="testimonial-img">
                  <img src="assets/images/Memoji.png" />
                </div>
                <div className="testimonial-con">
                  <h3>Christopher Smith</h3>
                  <p className="designation">Investor</p>
                </div>
              </div>
            </div>
          </div>{' '}
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="testimonialmain">
              <div className="star-rating">
                <ul>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                </ul>
              </div>
              <div className="FirstPara">
                <p>
                  Ecosystem and support system that really helps me especially
                  in
                </p>
              </div>
              <div className="testimonialbox">
                <div className="testimonial-img">
                  <img src="assets/images/Memoji.png" />
                </div>
                <div className="testimonial-con">
                  <h3>James Brian</h3>
                  <p className="designation">trader</p>
                </div>
              </div>
            </div>
          </div>{' '}
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="testimonialmain">
              <div className="star-rating">
                <ul>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                </ul>
              </div>
              <div className="FirstPara">
                <p>very good for long-term investment, Is the best crypto</p>
              </div>
              <div className="testimonialbox">
                <div className="testimonial-img">
                  <img src="assets/images/Memoji.png" />
                </div>
                <div className="testimonial-con">
                  <h3>Max Maximof</h3>
                  <p className="designation">Investor</p>
                </div>
              </div>
            </div>
          </div>{' '}
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="testimonialmain">
              <div className="star-rating">
                <ul>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                </ul>
              </div>
              <div className="FirstPara">
                <p>very good for long-term investment, Is the best crypto</p>
              </div>
              <div className="testimonialbox">
                <div className="testimonial-img">
                  <img src="assets/images/Memoji.png" />
                </div>
                <div className="testimonial-con">
                  <h3>Max Maximof</h3>
                  <p className="designation">Investor</p>
                </div>
              </div>
            </div>
          </div>{' '}
        </SwiperSlide>
      </Swiper>
    </>
  );
}
