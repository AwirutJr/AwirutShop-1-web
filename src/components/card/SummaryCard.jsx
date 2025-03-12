import { useEffect, useState } from "react"
import { listUserCart, SaveAddress } from "../../api/User"
import useAwirutStore from '../../store/AwirutStore'
import {useNavigate} from 'react-router-dom'
import { numberFormat } from '../../Utils/number'
import {toast} from 'react-toastify'

const SummaryCard = () => {
    const token = useAwirutStore((state) => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setcartTotal] = useState([])
    // console.log('cartTotal', cartTotal)
    // console.log('products', products)

    const navigate = useNavigate()

    const [address, Setaddress] = useState('')
    const [addressSave, SetaddressSave] = useState(false)

    useEffect(() => {
        hdlGetUserCart(token)
    }, [token])

    const hdlGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                console.log(res)
                setProducts(res.data.product)
                setcartTotal(res.data.cartToltal)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hdlSaveAddress = () => {
        if(!address) {
            return toast.warning('Please fill Address')
        }
        SaveAddress(token,address)
        .then((res)=> {
            console.log(res)
            toast.success(res.data.message)
            SetaddressSave(true)
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    const hdlGoToPayment = () => {
        if(!addressSave) {
            return toast.warning('กรุณากรอกที่อยู่')
        }
        navigate('/user/payment')
    }

    return (
        <div className="mx-auto">
            <div className="flex gap-4">
                {/* left */}
                <div className="w-2/4">
                    <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4 ">
                        <h1>ที่อยู่ในการจัดส่ง</h1>
                        <textarea 
                        required
                        onChange={(e)=> Setaddress(e.target.value)}
                        placeholder="กรุณากรอกที่อยู่จัดส่ง"
                        className="w-full bg-white rounded-md px-2" />
                        <button
                        onClick={hdlSaveAddress}
                        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:scale-105 hover:duration-200'>
                            Save Address
                        </button>
                    </div>
                </div>

                {/* right */}
                <div className="w-2/4">
                    <div className="p-4 rounded-md border shadow-md space-y-4">
                        <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>
                        {/* item list*/}

                        {
                            products?.map((item,index) =>
                                <div key={index}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">Title: {item.Product.title}</p>
                                            <p className="text-sm">จำนวน: {numberFormat(item.count)} x {numberFormat(item.Product.price)}</p>
                                        </div>

                                        <div>
                                            <p className="text-red-500 font-bold">{numberFormat(item.count * item.Product.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <hr />

                        {/* ส่วนลด + ค่าจัดส่ง */}
                        <div>
                            <div className="flex justify-between items-center">
                                <p>ค่าจัดส่ง:</p>
                                <p>0.00</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>ส่วนลด:</p>
                                <p>0.00</p>
                            </div>
                        </div>
                        <hr />

                        {/* ยอดรวมสุทธิ */}
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-lg">ยอดรวมสุทธิ:</p>
                                <p className="font-bold text-red-500 text-lg">{numberFormat(cartTotal)}</p>
                            </div>
                        </div>

                        <hr />
                        {/* ชำระเงิน */}
                        <div>
                            <button
                            onClick={hdlGoToPayment}
                            // disabled = {!addressSave} //ถ้าเป็น false จะทำงาน
                            className="bg-blue-500 text-white w-full p-2 rounded-md">
                                ดำเนินการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard
