import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../components/SwiperCustom.css';

export default function App() {
  return (
    <>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 50,
          },
        }}
        slidesPerView={4.5}
        spaceBetween={30}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="item">
            <div className="currencybox">
              <div className="coin-img">
                <img src="assets/images/bitcpin.png" />
              </div>
              <div className="coin-con">
                <h3>Bitcoin</h3>
                <p className="price">
                  USD 34879.4 <span className="diff-color pink">-5.48%</span>
                </p>
                <img src="assets/images/p-vector.png" />
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="currencybox">
              <div className="coin-img">
                <img src="assets/images/ethereum.png" />
              </div>
              <div className="coin-con">
                <h3>Ethereum</h3>
                <p className="price">
                  USD 34879.4 <span className="diff-color blue">-3.86%</span>
                </p>
                <img src="assets/images/b-vector.png" />
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="currencybox">
              <div className="coin-img">
                <img src="assets/images/solana.png" />
              </div>
              <div className="coin-con">
                <h3>Solana</h3>
                <p className="price">
                  USD 34879.4 <span className="diff-color pink">-5.48%</span>
                </p>
                <img src="assets/images/p-vector.png" />
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="currencybox">
              <div className="coin-img">
                <img src="assets/images/bnb.png" />
              </div>
              <div className="coin-con">
                <h3>BNB</h3>
                <p className="price">
                  USD 34879.4 <span className="diff-color blue">-5.48%</span>
                </p>
                <img src="assets/images/b-vector.png" />
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="item">
              <div className="currencybox">
                <div className="coin-img">
                  <img src="assets/images/bnb.png" />
                </div>
                <div className="coin-con">
                  <h3>BNB</h3>
                  <p className="price">
                    USD 34879.4 <span className="diff-color pink">-5.48%</span>
                  </p>
                  <img src="assets/images/b-vector.png" />
                  <a href="#">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
