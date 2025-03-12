import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { LoaderCircle } from 'lucide-react';


//file
import useAwirutStore from "../store/AwirutStore"
import { removeFiles, uploadFiles } from '../api/Product'

import { useState } from 'react'


const Uploadfile = ({ form, setForm }) => {
    const token = useAwirutStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (e) => {
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} บ่แม่นรูป`)
                    continue
                }
                // Image Resize 
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint Backend
                        uploadFiles(token, data)
                            .then((res) => {
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image Sucess!!!')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleDelete = (e, public_id) => {
        e.preventDefault() // ป้องกันการทำงานอื่นๆ ที่ไม่ต้องการ เช่น การส่งฟอร์ม

        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => item.public_id !== public_id)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {
                    isLoading && <LoaderCircle className='w-16 h-16 animate-spin' /> //ถ้า isLoading = true จะทำข้างหลัง &&
                }
                
                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div className='relative' key={index}>
                            <img
                                className='w-24 h-24 hover:scale-105'
                                src={item.url} />
                            <button
                                onClick={(e) => handleDelete(e, item.public_id)} // ส่ง event e เพื่อป้องกันการทำงานที่ไม่ต้องการ
                                className='absolute top-0 right-0 bg-red-500 p-1 rounded-md'>X</button>
                        </div>
                    )
                }
            </div>

            <div className="relative ">
                <input
                    onChange={handleOnChange}
                    type="file"
                    name="images"
                    multiple
                    id="fileInput"
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                <label for="fileInput" className="w-40 block bg-green-500 text-white py-2 px-4 rounded-md text-center cursor-pointer hover:bg-green-600 transition-colors">
                    เลือกไฟล์
                </label>
            </div>

        </div>
    )
}

export default Uploadfile
