import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"

const layout = () => {
  return (
    <div>

        <MainNav />

      <main className="h-screen px-2 mt-2 mx-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default layout
