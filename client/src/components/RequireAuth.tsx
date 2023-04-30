import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


 const RequireAuth = () => {
    const { auth }:any = useAuth();
    const location = useLocation()
    console.log("RequireToken:" ,auth)


    return(
    <>
        {Object.keys(auth).length === 0 ? (
            <Navigate to="/login" replace state={{ from : location}}/>
        ):(
            <Outlet/>
        )}
    </>
    )
}

export default RequireAuth;