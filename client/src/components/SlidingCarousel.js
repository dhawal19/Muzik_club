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
        <img src="https://media.licdn.com/dms/image/C4E0BAQEogaSWUhGhdg/company-logo_200_200/0/1599289774784?e=2147483647&v=beta&t=UPyolRrk9tQ3a0PKcnCwt9MJlJhU_5CPhM3JaBWLeo0" alt="Image 1" />
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
    </Slider>
  );
};


export default SlidingCarousel;