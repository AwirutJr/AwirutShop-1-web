import useAwirutStore from '../store/AwirutStore'
import { useState, useEffect } from 'react'
import { createCategory, removeCategory} from '../api/Category'
import { toast } from 'react-toastify'

const Formcategory = () => {
  const token = useAwirutStore((state) => state.token)
  const categories = useAwirutStore((state) => state.Categories)
  const getCategory = useAwirutStore((state) => state.actionGetCategory)
  // console.log(categories)

  const [name, setName] = useState('')

  useEffect(() => {
    getCategory(token)
  }, [token, getCategory])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createCategory(token, { name })
      toast.success(`Created ${res.data.name} successfully`)
      getCategory(token)
      console.log(res)
      setName('')  // รีเซ็ต input field หลังจากการเพิ่ม category
    } catch (err) {
      console.log(err)
      toast.error(`คุณมีแล้วว`)
    }
  }

  const handleDelete = async (item) => {
    try {
      await removeCategory(token, item.id)
      toast.success(`Category deleted ${item.name} successfully`)
      getCategory(token)
    } catch (err) {
      console.log(err)
      toast.error('เกิดข้อผิดพลาดในการลบ')
    }
  }

  return (
    <div className='container mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-semibold mb-4'>Category Management</h1>

      <form onSubmit={handleSubmit} className='flex items-center space-x-4 mb-6'>
        <input
          type="text"
          className='border border-gray-300 p-2 rounded-md w-full'
          onChange={(e) => setName(e.target.value)}
          value={name} // เพิ่ม value สำหรับ input field
          placeholder='Enter category name'
        />
        <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
          Add Category
        </button>
      </form>

      <ul className='space-y-4'>
        {categories.map((item, index) => (
          <li key={index} className='flex justify-between items-center p-3 border-b border-gray-200'>
            <span className='text-lg'>{item.name}</span>
            <button
              className='bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300'
              onClick={() => handleDelete(item)} // เพิ่มการลบในปุ่ม
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Formcategory
