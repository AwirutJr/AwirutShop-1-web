import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa";
import useAwirutStore from "../store/AwirutStore";
import { useNavigate } from "react-router-dom";
const SidebarAdmin = () => {
  const logout = useAwirutStore(s => s.Logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen"> {/* เพิ่ม min-h-full */}
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={'/admin'}
          end
          className={({ isActive }) =>
            isActive
              ? 'text-white bg-gray-900 flex items-center rounded-md px-4 py-2'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex item-center'
          }
        >
          <MdOutlineDashboard className="text-xl mr-1" />
          <p className="text-base">Dashboard</p>
        </NavLink>

        <NavLink
          to={'Manager'}
          className={({ isActive }) =>
            isActive
              ? 'text-white bg-gray-900 flex items-center rounded-md px-4 py-2'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex item-center'
          }
        >
          <GrUserManager className="text-xl mr-1" />
          <p className="text-base">Manager</p>
        </NavLink>

        <NavLink
          to={'Category'}
          className={({ isActive }) =>
            isActive
              ? 'text-white bg-gray-900 flex items-center rounded-md px-4 py-2'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex item-center'
          }
        >
          <MdCategory className="text-xl mr-1" />
          <p className="text-base">Category</p>
        </NavLink>

        <NavLink
          to={'Product'}
          className={({ isActive }) =>
            isActive
              ? 'text-white bg-gray-900 flex items-center rounded-md px-4 py-2'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex item-center'
          }
        >
          <MdOutlineProductionQuantityLimits className="text-xl mr-1" />
          <p className="text-base">Product</p>
        </NavLink>

        <NavLink
          to={'orders'}
          className={({ isActive }) =>
            isActive
              ? 'text-white bg-gray-900 flex items-center rounded-md px-4 py-2'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex item-center'
          }
        >
          <FaBorderAll className="text-xl mr-1" />
          <p className="text-base">Orders</p>
        </NavLink>
      </nav>

      <div className="bg-gray-900 w-[100%] h-[15%] p-4 flex justify-center items-center">
        <button
          onClick={handleLogout}
          className="text-gray-300 bg-gray-900 w-[95%] h-[50px] p-4 flex items-center space-x-2 rounded-lg hover:bg-gray-500 hover:text-white"
        >
          <MdOutlineLogout />
          <p>Logout</p>
        </button>
      </div>

    </div>
  )
}

export default SidebarAdmin
