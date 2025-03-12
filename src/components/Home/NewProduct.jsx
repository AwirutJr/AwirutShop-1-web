import { useState, useEffect  } from "react"
import { ListProductBy } from "../../api/Product"
import  ProductCard from "../card/ProductCard"
const NewProduct = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        ListProductBy("updatedAt","desc",10)
        .then((res)=> {
          setData(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="flex flex-wrap gap-4 ">
    {
      data?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))
    }
  </div>
  )
}

export default NewProduct
