import { Swiper, SwiperSlide, } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const SwiperShowProduct = ({ children }) => {
    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={10}
            pagination={true} modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                430: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
            navigation={true}
            className="mySwiper object-cover rounded-md">

            {children}

        </Swiper>
    )
}

export default SwiperShowProduct
