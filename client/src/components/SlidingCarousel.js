import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlidingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div className="carousel-item">
        <img src="https://via.placeholder.com/300" alt="Image 1" />
      </div>
      <div className="carousel-item">
        <img src="https://via.placeholder.com/300" alt="Image 2" />
      </div>
      <div className="carousel-item">
        <img src="https://via.placeholder.com/300" alt="Image 3" />
      </div>
      <div className="carousel-item">
        <img src="https://via.placeholder.com/300" alt="Image 4" />
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
};


export default SlidingCarousel;