import useAwirutStore from "../../store/AwirutStore"
import { useState, useEffect } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchCard = () => {
    const actionGetProduct = useAwirutStore((state) => state.actionGetProduct)
    const actionSearchFilters = useAwirutStore((state) => state.actionSearchFilters)
    const Categories = useAwirutStore((state) => state.Categories)
    const actionGetCategory = useAwirutStore((state) => state.actionGetCategory)

    //ค้นหาด้วย text
    const [text, setText] = useState('')
    //ค้นหาด้วย category
    const [categorySelected, setCategorySelected] = useState([])
    //ค้นหาด้วยราคา
    const [price, setPrice] = useState([500, 1000])
    const [ok, setOk] = useState(false)

    useEffect(() => {
        actionGetCategory()
    }, [actionGetCategory])

    //ช่อง search
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                // ค้นหาผลิตภัณฑ์
                actionSearchFilters({ query: text })
            } else {
                // ถ้าไม่มีการพิมพ์ใดๆ ให้ดึงสินค้าทั้งหมด
                actionGetProduct()
            }
        }, 500)

        // ลบการตั้งค่า timeout ก่อนจะตั้งค่าใหม่
        return () => clearTimeout(delay)
    }, [text, actionSearchFilters, actionGetProduct])

    // ช่องค้นหาโดยกด checkbox category
    const handleCheck = (e) => {
        const inCheck = e.target.value //ค่าที่เราเช็ค
        const inState = [...categorySelected] // [] arr ว่าง
        const fineCheck = inState.indexOf(inCheck) //ถ้าไม่เจอจะ return -1

        if (fineCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(fineCheck, 1)
        }
        setCategorySelected(inState)

        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            actionGetProduct()
        }
    }

    useEffect(() => {
        // ทำการค้นหาด้วยราคาเมื่อราคาเปลี่ยนแปลง
        if (price.length === 2) {
            actionSearchFilters({ price })
        }
    }, [price, actionSearchFilters])  // เพิ่ม price เป็น dependency

    const handlePrice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        })
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Search Product</h1>
            <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search..."
                className="border rounded-md p-2 w-full mb-4"
            />


            <hr />

            <div>
                <h1 className="text-xl">Category</h1>
                {
                    Categories.map((item, index) =>

                        <div key={index}>
                            <input
                                onChange={handleCheck}
                                value={item.id}
                                type="checkbox"
                            />
                            <label> {item.name}</label>
                        </div>
                    )
                }
            </div>

            <div>
                <h1>search Price</h1>
                <div>

                    <div className="flex justify-between ">
                        <span>Min : {price[0]}</span>
                        <span>Max : {price[1]}</span>
                    </div>

                    <Slider
                        onChange={handlePrice}
                        range
                        min={0}
                        max={100000}
                        defaultValue={[0, 50000]}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchCard
