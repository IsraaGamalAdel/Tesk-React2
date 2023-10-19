import React from 'react';
import styles from './MainSlider.module.css';
import slider1 from '../../Assets/images/img/img1.jpg';
import slider2 from '../../Assets/images/img/img2.jpg';
import slider3 from '../../Assets/images/img/img3.jpg';
import blog1 from '../../Assets/images/img/img4.jpg';
import blog2 from '../../Assets/images/img/img5.jpg';
import Slider from 'react-slick';

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return <>
    <div className=' container'>
      <div className="row pb-4 gx-0 justify-content-center align-items-center">
        <div className="col-md-3">
          <div className='mb-5'>
            <Slider {...settings}>
              <img src={slider1} alt="Slider" className='w-100' height={400} />
              <img src={slider2} alt="Slider" className='w-100 ' height={400}/>
              <img src={slider3} alt="Slider" className='w-100 ' height={250}/>
            </Slider>
          </div>
        </div>

        <div className="col-md-2">
            <div>
                <img src={blog1} alt="blog" className='' height={200} width={300} style={{maxWidth:'100%'}}/>
                <img src={blog2} alt="blog" className='' height={200} width={300} style={{maxWidth:'100%'}}/>
            </div>
        </div>
      </div>
    </div> 
  </>
}
