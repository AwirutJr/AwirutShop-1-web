import useAwirutStore from '../store/AwirutStore'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Uploadfile from './Uploadfile';
import { useNavigate, useParams } from 'react-router-dom'
//api
import { readProduct, updateProduct } from '../api/Product'

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
};

const EditFormProduct = () => {
    const { id } = useParams()  // ดึง id จาก URL
    const navigate = useNavigate()

    const token = useAwirutStore((state) => state.token);
    const Categories = useAwirutStore((state) => state.Categories);
    const actionGetCategory = useAwirutStore((state) => state.actionGetCategory);
    const actionGetProduct = useAwirutStore((state) => state.actionGetProduct);

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        // โหลด categories และข้อมูลสินค้าที่ต้องการแก้ไข
        actionGetCategory([])
        fetchProduct(token, id ,form)
        actionGetProduct()
    }, [token, id]) // เพิ่ม dependencies ให้ useEffect

    const fetchProduct = async (token, id) => {
        try {
            const res = await readProduct(token, id , form)
            // console.log('res from backend', res)
            setForm(res.data)
        } catch (err) {
            console.log(err)
            toast.error('Failed to load product data.')
        }
    }

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data to Submit:", form)
        try {
            const res =  await updateProduct(token, id, form)
            console.log('res from backend', res)
            toast.success(`Product ${form.title} updated successfully!`)
            setForm(initialState)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error('An error occurred while updating the product.')
            }
        }
    }
    

    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-semibold text-center mb-8">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                onChange={handleOnChange}
                                value={form.title}
                                name="title"
                                placeholder="Title"
                            />
                        </div>

                        <div>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                onChange={handleOnChange}
                                value={form.description}
                                name="description"
                                placeholder="Description"
                            />
                        </div>

                        <div>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                onChange={handleOnChange}
                                value={form.price}
                                name="price"
                                placeholder="Price"
                            />
                        </div>

                        <div>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                onChange={handleOnChange}
                                value={form.quantity}
                                name="quantity"
                                placeholder="Quantity"
                            />
                        </div>

                        <div>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="categoryId"
                                onChange={handleOnChange}
                                required
                                value={form.categoryId}
                            >
                                <option value="" disabled>
                                    Please Select Category
                                </option>
                                {Categories.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Uploadfile form={form} setForm={setForm} />

                        <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditFormProduct
