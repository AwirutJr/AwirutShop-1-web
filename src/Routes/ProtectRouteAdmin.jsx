import { useState ,useEffect} from 'react'
import useAwirutStore from '../store/AwirutStore'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './loadingToredirect'

const ProtectRouteAdmin = ({ element }) => {

    const [ok , setOk] = useState(false)
    const admin = useAwirutStore( (state) => state.user)
    const token = useAwirutStore( (state) => state.token)
    // console.log(admin)

    useEffect(() => {
        if (admin && token) {
           currentAdmin(token)
               .then(() => setOk(true))
               .catch(() => setOk(false))
        }
    }, [admin, token]);
    
  return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteAdmin