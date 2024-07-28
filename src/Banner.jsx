import React from 'react'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderSection from './HeaderSection';
import Slider from "react-slick";


export default function Banner() {

    var settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 5000,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

  return (
    <div className='banner'>
        <Slider {...settings}>
            <div className='p-4'>
                <HeaderSection/>
            </div>
            <div  className='p-4'>
                <HeaderSection/>
            </div>
            <div className='p-4'>
                <HeaderSection/>
            </div>
            <div className='p-4'>
                <HeaderSection/>
            </div>
            <div className='p-4'>
                <HeaderSection/>
            </div>
        </Slider>
    </div>
  )
}



