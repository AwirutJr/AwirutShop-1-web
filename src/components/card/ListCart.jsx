import { List } from 'lucide-react';
import useAwirutStore from '../../store/AwirutStore';
import { Link, useNavigate } from 'react-router-dom';
import { UserCart } from '../../api/User';
import { toast } from 'react-toastify';
import { numberFormat } from '../../Utils/number'



const ListCart = () => {
  const cart = useAwirutStore((state) => state.Carts);
  const user = useAwirutStore((state) => state.user);
  const token = useAwirutStore((state) => state.token);
  const actionGetTotalPrice = useAwirutStore((state) => state.actionGetTotalPrice); // แก้ไขที่นี่

  const navigate = useNavigate()

  const handleSaveCart = async() => {
    await UserCart(token, {cart})
    .then((res)=> {
      console.log(res)
      toast.success('บันทึกข้อมุลสำเร็จ')
      navigate('/Checkout')
    })
    .catch((err)=>toast.warning(err.response.data.message))
  } 
  // คำนวณราคาทั้งหมด
  const totalPrice = actionGetTotalPrice(); // คำนวณราคาทั้งหมดจากฟังก์ชันใน Zustand

  return (
    <div className='bg-gray-200 rounded-md p-4'>
      {/* header */}
      <div className='flex'>
        <List className='mr-2' />
        <p className='font-bold'>รายการสินค้า {numberFormat(cart.length)} สินค้า</p>
      </div>


      {/* Product */}
      <div className='flex justify-between mt-2'>
        {/* left */}

        <div className='flex flex-col w-3/4 gap-4'>
          {
            cart.map((item, index) => (
              <div key={index} className='bg-white rounded-xl p-4 flex items-center justify-between h-32 mr-10'>

                {/* img + title,price  left */}
                <div className='flex'>
                  {
                    item.images && item.images.length > 0
                      ? <img
                        className='w-24 h-24 rounded-md'
                        src={item.images[0].url} />
                      : <div className='bg-gray-200 shadow rounded-md w-24 h-24 flex justify-center items-center p-2'>No img</div>
                  }
                  <div className='p-4 flex flex-col items-start justify-center'>
                    <p className='font-bold text-left'>{item.title}</p>
                    <p className='text-sm text-gray-700 text-center'>${numberFormat(item.price)} × {item.count}</p>
                  </div>
                </div>

                <div>
                  $ {numberFormat(item.price * item.count)}
                </div>

              </div>
            ))
          }
        </div>


        {/* right */}
        <div className='rounded-lg bg-white p-6 w-1/4 h-64 shadow-lg'>
          <h1 className='text-2xl font-bold mb-4'>ยอดรวม</h1>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-lg'>รวมสุทธิ:</p>
            <p className='text-lg font-semibold'>$ {numberFormat(totalPrice)}</p>
          </div>

          <div className='flex flex-col gap-4'>
            {
              user ? 
              <button 
              disabled={cart.length < 1 } //ถ้าน้อยกว่า 1 จะไม่สามารถทำงานได้ปุ่มนี้
              onClick={handleSaveCart}
              className='shadow-md w-full rounded-sm bg-red-500 text-white py-2 flex items-center justify-center'>
                สั่งซื้อ
              </button>
              : <Link to='/Login' className='shadow-md w-full rounded-sm bg-blue-500 text-white py-2 flex items-center justify-center'>
                Login
                </Link>
            }
            <Link to='/shop' className='border border-gray-300 shadow-md w-full rounded-sm py-2 flex items-center justify-center'>
              แก้ไขรายการ
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ListCart
