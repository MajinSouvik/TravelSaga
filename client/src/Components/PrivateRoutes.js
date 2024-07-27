import { useState } from "react";
import {useCookies} from "react-cookie"
import {Outlet, useNavigate} from "react-router-dom"
import Login2 from "./Login2";

function PrivateRoutes(){
    const [user, setUser]=useState(false)
    const [cookies,removeCookie] = useCookies([]);
    const navigate=useNavigate()
    console.log("Inside Private Routes")
    console.log("cookies-private**",cookies)
    return (
        user?<Outlet />:<Login2 />
    )
}

export default PrivateRoutes