import useAwirutStore from '../../store/AwirutStore'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';




const Login = () => {
  const actionLogin = useAwirutStore((state) => state.actionLogin)
  const user = useAwirutStore((state) => state.user)
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [form ,setForm] = useState({
    email: "",
    password: ""
  })

  const handleOnChang = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await actionLogin(form);
      
      toast.success("Login successful");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    // ตรวจสอบว่า user ถูกอัพเดทแล้วหรือยัง
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  }, []);  // เช็คการเปลี่ยนแปลงของ user

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input 
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="email" 
        name="email"
        onChange={handleOnChang}
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input 
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="password" 
        name="password"
        onChange={handleOnChang}
        required
      />
    </div>

    <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">
      Submit
    </button>
  </form>
</div>

  )
}

export default Login
