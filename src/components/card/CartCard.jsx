import { Trash2, CircleMinus, CirclePlus } from 'lucide-react';
import useAwirutStore from '../../store/AwirutStore';
import {Link} from 'react-router-dom'
import { numberFormat } from '../../Utils/number'


const CartCard = () => {
    const carts = useAwirutStore((state) => state.Carts);
    const actionUpdateQuantity = useAwirutStore((state) => state.actionUpdateQuantity);
    const actionRemoveProduct = useAwirutStore((state) => state.actionRemoveProduct);
    const actionGetTotalPrice = useAwirutStore((state) => state.actionGetTotalPrice); // แก้ไขที่นี่

    // คำนวณราคาทั้งหมด
    const totalPrice = actionGetTotalPrice(); // คำนวณราคาทั้งหมดจากฟังก์ชันใน Zustand

    return (
        <div className="p-2 max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">ตระกร้าสินค้า</h1>

            <div className="">
                {carts.map((item, index) => (
                    <div key={index} className="mb-4 border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
                        <div className="flex justify-between mb-6">
                            <div className="flex gap-4 items-center">
                                {/* Image Placeholder */}
                                {
                                    item.images && item.images.length > 0
                                        ? <img
                                            className='w-20 h-20 rounded-md shadow'
                                        src={item.images[0].url} />
                                        : <div className="w-20 h-20 bg-gray-100 rounded-md flex justify-center items-center text-gray-400">
                                            No img
                                            </div>
                                }

                                <div>
                                    <p className="text-lg font-semibold text-gray-700">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </div>
                            </div>

                            <div onClick={() => actionRemoveProduct(item.id)}>
                                <Trash2 className="text-red-400 cursor-pointer hover:text-red-500 transition duration-300 transform hover:scale-110" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4 py-2 px-4">

                                <CircleMinus
                                    onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                />

                                <span className="text-lg font-medium text-gray-700">{numberFormat(item.count)}</span>

                                <CirclePlus
                                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                />

                            </div>

                            <div className="font-semibold text-lg text-blue-500">
                                {numberFormat(item.price * item.count)} ฿  {/* คูณราคากับจำนวนสินค้า */}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Total Price */}
            <div className="flex justify-between text-lg font-semibold mt-6 mb-2 px-2">
                <span className="text-gray-600">ราคารวม</span>
                <span className="text-blue-600">{numberFormat(totalPrice)} ฿</span> {/* แสดงผลราคาสินค้าทั้งหมด */}
            </div>

            {/* Checkout Button */}
            <Link to='/cart'>
                <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                    ดำเนินการชำระเงิน
                </button>
            </Link>
        </div>
    );
};

export default CartCard;
