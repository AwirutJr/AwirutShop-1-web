import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"

const layoutUser = () => {
  return (
    <div>

        <MainNav />

      <main className="h-screen px-4 mt-2 mx-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default layoutUser
