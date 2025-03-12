import { useState, useEffect  } from "react"
import { ListProductBy } from "../../api/Product"
import  ProductCard from "../card/ProductCard"
import SwiperShowProduct from "../../Utils/SwiperShowProduct"
import { SwiperSlide } from "swiper/react"
const BestSeller = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        ListProductBy("sold","desc",5)
        .then((res)=> {
          setData(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }

  return (
    <SwiperShowProduct>
    {
      data?.map((product, index) => (
        <SwiperSlide>
        <ProductCard key={index} product={product} />
        </SwiperSlide>
      ))
    }
  </SwiperShowProduct>
  )
}

export default BestSeller
