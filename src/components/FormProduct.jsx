import useAwirutStore from '../store/AwirutStore'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Uploadfile from './Uploadfile';
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { numberFormat } from '../Utils/number'
import { formatDate } from '../Utils/moment'
//api
import { createProduct, romoveProduct } from '../api/Product'

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
};

const FormProduct = () => {
    const token = useAwirutStore((state) => state.token);
    const Categories = useAwirutStore((state) => state.Categories);
    const actionGetCategory = useAwirutStore((state) => state.actionGetCategory);

    const Products = useAwirutStore((state) => state.Products);
    const actionGetProduct = useAwirutStore((state) => state.actionGetProduct);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: "",
        images: [],
    })
    // console.log(Products)

    useEffect(() => {
        //code
        actionGetCategory()
        actionGetProduct()
    }, [])

    const handleOnChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form)
        try {
            //code
            await createProduct(token, form)
            toast.success(`Create ${form.title} Sucess!!!`)
            actionGetProduct()

            //รีเซ้ตช่อง
            setForm(initialState)
        } catch (err) {
            console.log(err)
            if (err.response.data.message) {
                toast.error(err.response.data.message)
            }
        }
    }

    const handleDelete = async (id, name) => {
        try {
            //code
            await romoveProduct(id)
            toast.success(`Delete ${name} Sucess!!!`)
            actionGetProduct()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div >
            <div className="max-w-auto mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-semibold text-center mb-8">Create Product</h2>
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


            <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden mt-4">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Sold</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Updated At</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Products.map((item, index) => {
                            return (
                                <tr key={index} className="transition-colors duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>

                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {item.images.length > 0 ? (
                                            <img
                                                className="w-24 h-24 rounded-lg shadow-md"
                                                src={item.images[0].url}
                                            />
                                        ) : (
                                            <div
                                                className="w-24 h-24 bg-gray-200 rounded-md 
                                                    flex items-center justify-center shadow-sm"
                                            >
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{item.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{item.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{numberFormat(item.price)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{numberFormat(item.quantity)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{numberFormat(item.sold)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{formatDate(item.updatedAt)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 transform translate-y-[30px] flex">
                                        <Link to={'/admin/product/' + item.id} className="text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded transition duration-200 ease-in-out">
                                            <Pencil />

                                        </Link>
                                        <button className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded transition duration-200 ease-in-out ml-2"
                                            onClick={() => handleDelete(item.id, item.title)}
                                        >
                                            <Trash2 />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>


        </div>
    )
}

export default FormProduct
