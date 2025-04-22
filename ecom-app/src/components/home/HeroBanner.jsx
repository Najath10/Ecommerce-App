import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';


const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

const HeroBanner = () => {
    return (
        <div className='py-2 rounded-md'>
            <Swiper
                grabCursor = {true}
                autoplay = {{
                    delay:4000,
                    disableOnInteraction: false,
                }}
                 effect="fade"
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{clickable: true}}
                scrollbar={{ draggable: true}}
                slidesPerView={1}>

                    {bannerLists.map((item, i) => (
                        <SwiperSlide key={item.id}>
                            <div className={`carousel-item rounded-md sm:h-[500px]  h-96 ${colors[i]} `}>
                                <div className='flex items-center justify-center'>
                                    <div className='hidden lg:flex justify-center w-1/2 p-8'>
                                    <div className='text-center'>
                                        <h3 className='text-3xl text-white font-bold'>
                                            {item.title}
                                        </h3>
                                        <h1 className='text-5xl text-white font-bold mt-2'>
                                            {item.subtitle}
                                        </h1>
                                        <p className='text-white font-bold mt-4'>
                                            {item.description}
                                        </p>
                                        <Link 
                                            className='mt-6 inline-flex items-center gap-1  bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition'
                                            to="/products">
                                          Shop <BiShoppingBag className='text-lg' />
                                        </Link>
                                    </div>
                                </div>
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
    );
}


export default HeroBanner;