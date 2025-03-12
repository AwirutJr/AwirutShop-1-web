import { ShoppingCart } from 'lucide-react';
import useAwirutStore from '../../store/AwirutStore';
import { numberFormat } from '../../Utils/number'
import { motion } from 'framer-motion'


const ProductCard = ({ product }) => {
  const actionAddtoCart = useAwirutStore((state) => state.actionAddtoCart);
  // const Carts = useAwirutStore((state) => state.Carts);
  // console.log(product.quantity)
  if (!product) {
    return <div>Invalid product data</div>;
  }

  // ตรวจสอบว่า quantity ของสินค้าคือ 0 หรือไม่
  if (!product || product.quantity === 0) {
    return null; // ถ้า quantity เป็น 0 ก็ไม่แสดงสินค้านี้
  }

  return (
    <motion.div 
    initial={{ opacity:0, scale: 0.5}}
    animate={{ opacity:1, scale: 1}}
    transition={{ duration: 0.5 }}
    >
    <div className="rounded-md shadow-md p-4 w-44">
      <div>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            className="rounded-md w-full h-32 object-cover hover:scale-110 hover:duration-200"
            alt={product.title}
          />
        ) : (
          <div className="border w-full h-32 rounded-md text-center flex items-center justify-center shadow">
            No Images
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-xl truncate">{product.title}</p>
        <p className="text-sm text-gray-500 truncate">{product.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">{numberFormat(product.price)}</span>
        <button
          onClick={() => actionAddtoCart(product)}
          className="bg-red-500 rounded-sm p-2 hover:bg-red-700 shadow-md"
        >
          <ShoppingCart />
        </button>
      </div>
    </div>
    </motion.div>
  );
};

export default ProductCard;
