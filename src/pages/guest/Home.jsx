import BestSeller from "../../components/Home/BestSeller"
import Content from "../../components/Home/content"
import NewProduct from "../../components/Home/NewProduct"

const Home = () => {
  return (
    <div className="px-10">
      <Content />

      <p className="text-2xl text-center mt-6 mb-2">สินค้าขายดี</p>
      <hr />
      <div className="flex items-center justify-center mt-5">
        <BestSeller />
      </div>

      <p className="text-2xl text-center mt-6 mb-2">สินค้าใหม่</p>
      <div className="flex items-center justify-center mt-5">
        <NewProduct />
      </div>
    </div>
  )
}

export default Home
