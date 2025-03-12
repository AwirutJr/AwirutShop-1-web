import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { actionRegister } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'


const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid Email!' }),
  password: z.string().min(8, { message: 'Password must be more than 8 characters.' }),
  ConfirmPassword: z.string()
}).refine((data) => data.password === data.ConfirmPassword,
  {
    message: 'Password is not match',
    path: ['ConfirmPassword']
  })

const Register = () => {
  const navigate = useNavigate()
  const [passwordScore, SetpasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const ValidatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    SetpasswordScore(ValidatePassword())
  }, [watch().password])

  console.log(passwordScore)


  // const [form, setForm] = useState({
  //   email: '',
  //   password: '',
  //   ConfirmPassword: ''
  // })

  // const handleOnChang = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   })
  // }

  // const hdlSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log(form)

  //   if (form.password !== form.ConfirmPassword) {
  //     return toast.error('Password not match')
  //   }

  //   try {
  //     // ทำการเรียกฟังก์ชัน actionRegister
  //     await actionRegister(form)
  //     toast.success('Register Success')
  //     navigate('/login')
  //   } catch (err) {
  //     // แสดงข้อความที่ได้จากข้อผิดพลาด
  //     if (err.response && err.response.data && err.response.data.message) {
  //       toast.error(err.response.data.message)  // แสดงข้อความผิดพลาดที่เซิร์ฟเวอร์ส่งกลับมา
  //     } else {
  //       toast.error('Something went wrong. Please try again.') // กรณีที่ไม่ได้รับข้อความที่ชัดเจน
  //     }
  //     console.log(err)
  //   }
  // }

  const onSubmit = async (data) => {
    // console.log(data)
    // console.log( zxcvbn(data.password).score )

    // const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 2) {
    //   return toast.warning('Password is too weak. Please choose a stronger password.')
    // }

    try {
      await actionRegister(data)
      toast.success('Register Success')
      navigate('/login')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            {...register("email")}
            placeholder='Email'
            type="email"
            className={`w-full border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">Password</label>
          <input
            {...register("password")}
            className={`w-full border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            type="password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {
          watch().password?.length > 0 && <div className="flex">
            {Array.from(Array(5).keys()).map((item, index) => (
              <span className="w-[50px] px-1" key={index}>
                <div
                  className={`rounded-md h-2 ${passwordScore <= 2
                    ? 'bg-red-500'
                    : passwordScore < 4
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                    }`}
                />
              </span>
            ))}
          </div>
        }



        <div>
          <label htmlFor="ConfirmPassword" className="block font-medium">Confirm Password</label>
          <input
            {...register("ConfirmPassword")}
            className={`w-full border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 ${errors.ConfirmPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            type="password"
          />
          {errors.ConfirmPassword && <p className="text-red-500 text-sm mt-1">{errors.ConfirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register
