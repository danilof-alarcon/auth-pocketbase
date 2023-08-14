import { Navigate, Outlet } from 'react-router-dom'
import { useData } from "../context/DataContextProvider"


const PrivateRoutes = () => {

    const { auth } = useData()

return (
    auth ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoutes
