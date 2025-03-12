import { useState, useEffect } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide,  } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper.css'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Content = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        hdlGetImage()
    }, [])

    const hdlGetImage = () => {
        axios.get('https://picsum.photos/v2/list?page=1&limit=15')
            .then((res) => setData(res.data))
            .catch(err => console.log(err))
    }



    return (
        <div className='space-y-2'>
            <Swiper
                pagination={true} modules={[Pagination ,Autoplay ]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="mySwiper h-96 object-cover rounded-md">
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    )
                }
            </Swiper>

            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={true} modules={[Pagination, Autoplay ,Navigation]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                className="mySwiper object-cover rounded-md">
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

export default Content
