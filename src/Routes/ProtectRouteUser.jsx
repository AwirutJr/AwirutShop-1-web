import {useState, useEffect } from 'react'
import  useAwirutstore  from '../store/AwirutStore'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './loadingToredirect'


const ProtectRouteUser = ({ element }) => {


    const [ok , setOk] = useState(false)
    const user = useAwirutstore( (state) => state.user)
    const token = useAwirutstore( (state) => state.token)
    // console.log(user)

    useEffect( ()=> {
        if(user && token){
           //send to back
           currentUser(token)
           .then( ()=>setOk(true))
           .catch( ()=>setOk(false))
        }
    },[user,token])
    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteUser