import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css/bundle';
import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';
import Products from '../Products/Products';

const colors = ['bg-banner-color1','bg-banner-color2','bg-banner-color3','bg-banner-color4']
const HeroBanner = () => {
  return (
   <div className='py-2 rounded-md '>
     <Swiper
     grabCursor={true}
      autoplay={{delay:3000,
                disableOnInteraction:false
      }}
      modules={[Navigation, Pagination, A11y,EffectFade,Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: false }}

    >

      {bannerLists.map((item,i)=>(
         <SwiperSlide key={item.id}>
            <div className={`rounded-md sm:h-[400px] h-[350px] ${colors[i]} flex flex-col lg:flex-row items-center justify-between p-4`}>
                <div className=' flex justify-center items-center'>
                    <div className=' hidden lg:flex justify-center text-center items-center w-1/2 p-8'>
                      <div className='text-center'>
                      <h3 className='text 3xl text-white font-bold '>{item.title}</h3>
                      <h1 className='text-5xl text-white font-bold mt-2'>{item.subtitle}</h1>
                      <p className='text-white font-bold mt-4'>{item.description}</p>
                      <Link className='mt-5 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800'
                        to='/products'
                      >
                          Shop
                      </Link>
                      </div>
                    </div>
                <div className=' lg:w-1/2  sm:w-3/4 flex w-full justify-center items-center'>
                  <img   className=' object-contain' 
                  src={item.image} alt="No image available" />
                </div>
                </div>
            </div>
         </SwiperSlide>
      ))}
    </Swiper>
   </div>
  )
}

export default HeroBanner;
