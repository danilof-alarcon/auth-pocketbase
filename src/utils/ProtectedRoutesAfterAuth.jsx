import { Navigate, Outlet } from 'react-router-dom'
import { useData } from "../context/DataContextProvider"


const PrivateRoutesAfterAuth = () => {

    const { auth } = useData()

return (
    auth == false ? <Outlet/> : <Navigate to='/dashboard'/>
  )
}

export default PrivateRoutesAfterAuth
