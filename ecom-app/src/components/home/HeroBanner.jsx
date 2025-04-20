import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectFade, Autoplay } from 'swiper/modules';
import { BiShoppingBag } from 'react-icons/bi'; // Importing an icon for CTA button
import 'swiper/css/bundle';
import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';
import '../../app.css'

const colors = ['bg-banner-color1', 'bg-banner-color2', 'bg-banner-color3', 'bg-banner-color4']

const HeroBanner = () => {
  return (
    <div className='py-2 rounded-md'>
      <Swiper
        grabCursor={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
        effect="fade"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: false }}
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div className={`relative rounded-md sm:h-[400px] h-[350px] ${colors[i]} flex flex-col lg:flex-row items-center justify-between p-4`}>
              {/* Overlay Gradient - You can remove it if not needed */}
              <div className="absolute inset-0 bg-black/30 z-0 rounded-md" />
              <div className='relative z-10 flex justify-center items-center'>
                {/* Text & Button Section */}
                <div className='hidden lg:flex justify-center text-center items-center w-1/2 p-8'>
                  <div className='text-center'>
                    <h3 className='text-xl md:text-3xl text-white font-bold'>{item.title}</h3>
                    <h1 className='text-3xl md:text-5xl text-white font-bold mt-2'>{item.subtitle}</h1>
                    <p className='text-sm md:text-base text-white font-medium mt-4'>{item.description}</p>
                    <Link className='mt-5 inline-flex items-center gap-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition'
                      to='/products'
                    >
                      Shop <BiShoppingBag className='text-lg' />
                    </Link>
                  </div>
                </div>
                {/* Image Section */}
                <div className='lg:w-1/2 sm:w-3/4 w-full flex justify-center items-center'>
                  <img
                    className="animate-fade-in-up object-cover w-full h-full rounded-lg  transform transition duration-300 ease-in-out hover:scale-105"
                    src={item.image}
                    alt="No image available"
                  />
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
