import { Link, NavLink } from 'react-router-dom'
import useAwirutStore from '../store/AwirutStore'

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const MainNav = () => {
  const carts = useAwirutStore((state) => state.Carts.length)
  const logout = useAwirutStore((state) => state.Logout)
  const user = useAwirutStore((state) => state.user)
  const [IsOpen, setIsOpen] = useState(false)

  const ToggleDropdown = () => {
    setIsOpen(!IsOpen);
  }

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-blue-600 shadow-md h-16">
        <div>
          <Link to="/" className="text-xl font-bold text-white hover:text-orange-300 transition-colors">Logo</Link>
        </div>
        <div className="flex items-center justify-center space-x-12 px-4 py-2 h-[100%]">
          {/* Home NavLink */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-sm text-white bg-orange-300 px-2 py-1 rounded-md transition-all duration-300"
                : "text-sm text-white hover:text-orange-300 transition-colors duration-300"
            }>
            Home
          </NavLink>

          {/* Shop NavLink */}
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-sm text-white bg-orange-300 px-2 py-1 rounded-md transition-all duration-300"
                : "text-sm text-white hover:text-orange-300 transition-colors duration-300"
            }>
            Shop
          </NavLink>

          {/* History NavLink */}
          <NavLink
            to="/user/history"
            className={({ isActive }) =>
              isActive
                ? "text-sm text-white bg-orange-300 px-2 py-1 rounded-md transition-all duration-300"
                : "text-sm text-white hover:text-orange-300 transition-colors duration-300"
            }>
            History
          </NavLink>

          {/* Cart Link */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-sm text-white bg-orange-300 px-2 py-1 rounded-md transition-all duration-300"
                : "text-sm text-white hover:text-orange-300 transition-colors duration-300 relative"
            }>
            Cart
            {carts > 0 && (
              <span className='absolute z-10 top-[-6px] right-[-15px] bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center'>
                {carts}
              </span>
            )}
          </NavLink>
        </div>


        {
          user
            ? <div className="flex gap-2 ">
              <img
                className='w-8 h-8 '
                src='https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-hacker-avatars-flat-icons-pack-people-456327.png?f=webp&w=512' />
              <button
                onClick={ToggleDropdown}
                className='flex items-center hover:bg-gray-400 rounded-md'>
                <ChevronDown className='w-6 h-6 ' />
              </button>
              {
                IsOpen &&
                <div className='absolute right-0 top-16 flex flex-col w-64 bg-gray-800 justify-center items-center z-50'>
                  <Link className='hover:bg-gray-700 text-white h-10 w-full flex items-center justify-center'>Account</Link>
                  <Link className='hover:bg-gray-700 text-white h-10 w-full flex items-center justify-center'>History</Link>
                  <button
                    onClick={logout}
                    className='hover:bg-gray-700 text-white h-10 w-full'>Logout</button>
                </div>
              }
            </div>
            : <div className="flex space-x-6">
              <NavLink to="/login" className="text-sm text-white hover:text-orange-300 transition-colors duration-300">
                Login
              </NavLink>
              <NavLink to="/register" className="text-sm text-white hover:text-orange-300 transition-colors duration-300">
                Register
              </NavLink>
            </div>
        }



      </div>
    </div>
  )
}

export default MainNav
