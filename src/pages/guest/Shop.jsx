import { useEffect } from "react"
import ProductCard from "../../components/card/ProductCard"
import useAwirutStore from "../../store/AwirutStore"
import SearchCard from "../../components/card/SearchCard"
import CartCard from "../../components/card/CartCard"

const Shop = () => {
  const actionGetProduct = useAwirutStore((state) => state.actionGetProduct)
  const Products = useAwirutStore((state) => state.Products) || []

  useEffect(() => {
    actionGetProduct()
  }, [])

  return (
    <div className="flex h-screen">
      {/* Search bar */}
      <div className="w-1/4 p-4 border-r h-full">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-full sm:w-2/4 p-4 h-full overflow-hidden px-2">
        <p className="text-2xl font-bold mb-4">Product</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Product card */}
          {Products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-1/4 p-4 border-l h-full overflow-y-auto bg-gray-100">
        <CartCard />
      </div>
    </div>
  )
}

export default Shop
