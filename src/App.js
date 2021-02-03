import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.scss";

import "./App.css";
import Item from "./Item";

SwiperCore.use([Autoplay]);

const arr = [1, 2, 3, 4];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onTap = (swiper) => {
    setActiveIndex(swiper.clickedIndex);
  };

  return (
    <div className="App">
      <Swiper
        className="container"
        slidesPerView={3}
        autoplay={{ delay: 5000 }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        onTap={onTap}
      >
        {arr.map((value, index) => {
          return (
            <SwiperSlide key={index}>
              <Item active={activeIndex === index}>Slide {value}</Item>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default App;
