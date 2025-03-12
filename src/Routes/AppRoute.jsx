import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// routechack
import ProtectRouteAdmin from './ProtectRouteAdmin'
import ProtectRouteUser from './ProtectRouteUser'
//Layout
import Layout from '../Layout/Layout'
import LayoutUser from '../Layout/LayoutUser'
import LayoutAdmin from '../Layout/LayoutAdmin'
// auth
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
//guest
import Home from '../pages/guest/Home'
import Shop from '../pages/guest/Shop'
import Cart from '../pages/guest/Cart'
//user
import HomeUser from '../pages/user/Homeuser'
import History from '../pages/user/History'
import Payment from '../pages/user/payment'
//admin
import Dashboard from '../pages/admin/Dashboard'
import Manager from '../pages/admin/Manager'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import EditProduct from '../components/EditFormProduct'
import Checkout from '../pages/guest/Checkout'
import ManageOrder from '../pages/admin/ManageOrder'

const Router = createBrowserRouter([

    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true,element: <Home /> },
            { path: 'shop',element: <Shop /> },
            { path: 'cart',element: <Cart /> },
            { path: 'login',element: <Login /> },
            { path: 'register',element: <Register /> },
            { path: 'Checkout',element: <Checkout /> },
        ]
    },
    {
        path: '/user',
        element: <ProtectRouteUser element={<LayoutUser/>} />,
        children: [
            { index: true,element: <HomeUser /> },
            { path: 'payment',element: <Payment /> },
            { path: 'history',element: <History /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin/>} />,
        children: [
            { index: true,element: <Dashboard /> },
            { path: 'manager',element: <Manager /> },
            { path: 'category',element: <Category /> },
            { path: 'product',element: <Product /> },
            { path: 'product/:id',element: <EditProduct /> },
            { path: 'orders',element: <ManageOrder /> },
        ]
    },
])

const AppRoute = () => {
    return (
        <>
            <RouterProvider router={Router} />
        </>
    )
}

export default AppRoute
