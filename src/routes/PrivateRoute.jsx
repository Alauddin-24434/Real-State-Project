/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useAuth()
    if (loading) return <Loader />
    if (user) return children
    return <Navigate to='/login' state={{ from: location }} replace />


};

export default PrivateRoute;