import { GetOrdersAdmin, ChangOrderStatus } from "../../api/admin";
import { useEffect, useState } from "react";
import useAwirutStore from "../../store/AwirutStore";
import { toast } from 'react-toastify';
import { numberFormat } from '../../Utils/number'
import { formatDate } from '../../Utils/moment'

const TableOrders = () => {
  const token = useAwirutStore((state) => state.token);
  const [orders, setOrders] = useState([]);  // ค่าเริ่มต้นเป็น array


  useEffect(() => {
    hdlGetOrderAdmin(token);
  }, [token]);

  const hdlGetOrderAdmin = (token) => {
    GetOrdersAdmin(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data);
        toast.success("Update order success")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlChangeStatus = (token, orderId, orderStatus) => {
    //code
    ChangOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        // console.log(res);
        hdlGetOrderAdmin(token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return 'bg-gray-600'
      case "Processing":
        return 'bg-blue-600'
      case "Completed":
        return 'bg-green-600'
      case "Cancel":
        return 'bg-red-600'
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-50 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">ลำดับ</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">ผู้ใช้งาน</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">ที่อยู่</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">เวลา</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">สินค้า</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">รวม</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">สถานะ</th>
              <th className="py-2 px-4 text-center text-sm font-medium text-gray-600">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4 text-sm">{item.user.email}</td>
                  <td className="py-3 px-4 text-sm">{item.user.address}</td>
                  
                  <td className="py-3 px-4 text-sm">{ formatDate(item.user.createdAt) }</td>

                  <td className="py-3 px-4">
                    <ul className="space-y-1">
                      {item.products?.map((product, index) => (
                        <li key={index} className="flex flex-col">
                          <span className="font-medium text-gray-800">{product.Product.title}</span>
                          <span className="text-xs text-gray-600">
                            {product.count} X {numberFormat(product.Product.price)} ฿
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-3 px-4 text-sm font-semibold">{numberFormat(item.cartTotal)}฿</td>
                  <td className="py-3 px-4">
                    <span
                      className={`flex justify-center items-center px-3 py-1 rounded-full text-white w-[125px] ${getStatusColor(item.orderStatus)}`}>
                      {item.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <select
                      className="text-blue-500 hover:text-blue-700 bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={item.orderStatus}
                      onChange={(e) => hdlChangeStatus(token, item.id, e.target.value)}
                    >
                      <option value="Not Process">Not Process</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
