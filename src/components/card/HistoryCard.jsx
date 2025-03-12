import { useState, useEffect } from "react";
import useAwirutStore from "../../store/AwirutStore";
import { GetOrders } from "../../api/User";
import dayjs from 'dayjs'; // เพื่อให้วันที่ดูง่ายขึ้น
import { numberFormat } from '../../Utils/number'

const HistoryCard = () => {
    const token = useAwirutStore((s) => s.token);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        hdlGetorder(token);
    }, []);

    const hdlGetorder = (token) => {
        GetOrders(token)
            .then((res) => {
                // console.log(res);
                setOrder(res.data.order);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Order History</h1>

            {/* คลุม table */}
            <div className="space-y-4">
                {/* card loop order */}
                {order?.map((item, index) => {
                    // console.log("item", item);
                    return (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            {/* header */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-semibold text-gray-800">{dayjs(item.updatedAt).format("DD MMM YYYY, h:mm A")}</p>
                                </div>

                                <div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-white ${item.orderStatus === "Completed"
                                                ? "bg-green-500"
                                                : item.orderStatus === "Pending"
                                                    ? "bg-yellow-500"
                                                    : "bg-red-500"
                                            }`}>
                                        {item.orderStatus}
                                    </span>
                                </div>
                            </div>

                            {/* table loop product */}
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 text-left">PRODUCT</th>
                                            <th className="py-2 px-4 text-left">PRICE</th>
                                            <th className="py-2 px-4 text-center">COUNT</th>
                                            <th className="py-2 px-4 text-right">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.products?.map((product, index) => {
                                            // console.log("product", product);
                                            return (
                                                <tr key={index}>
                                                    <td className="py-2 px-4">{product.Product.title}</td>
                                                    <td className="py-2 px-4">{numberFormat(product.Product.price)}฿</td>
                                                    <td className="py-2 px-4 text-center">{numberFormat(product.count)}</td>
                                                    <td className="py-2 px-4 text-right">{numberFormat(product.count * product.Product.price)} ฿</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* total */}
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Total Price</p>
                                <p className="text-lg font-bold">{numberFormat(item.cartTotal)} ฿</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryCard;
