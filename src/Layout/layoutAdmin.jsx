import { Outlet } from "react-router-dom"
import SidebarAdmin from "../components/SidebarAdmin"
import HeaderAdmin from "../components/HeaderAdmin"


const layoutAdmin = () => {
  return (
    <div>
      <nav className="flex h-screen">
        <SidebarAdmin />

        <div className="flex-1 flex flex-col">
          <HeaderAdmin />
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Outlet />
          </main>
          
        </div>

      </nav>
    </div>
  )
}

export default layoutAdmin
