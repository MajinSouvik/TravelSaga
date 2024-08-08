import { useState, useEffect } from "react";
import {useCookies} from "react-cookie"
import {Outlet, useNavigate} from "react-router-dom"
import Login2 from "./Login2";
import axios from "axios"
import {useSelector} from "react-redux"

let firstRender=true

function PrivateRoutes(){
    const [user, setUser]=useState(null)
    const isLoggedIn = useSelector((store)=>store.auth.isLoggedIn)

    console.log("private-route-logged-in-->",isLoggedIn)
    const sendRequest = async()=>{
        const resp=await axios.get("http://localhost:8000/user",{
            withCredentials: true
        }).catch(err=>console.log(err))

        const data=resp.data
        console.log("*&*-->",data)
        return data
    }

    const refreshToken=async()=>{
        const resp=await axios.get("http://localhost:8000/refresh",{
            withCredentials: true
        }).catch(err=>console.log(err))

        const data=resp.data
        console.log("*&*-->resp*",data)
        return data
    }

    useEffect(()=>{
        if(firstRender){
            firstRender=false
            sendRequest().then((data)=>{
                console.log("1st-req-->",data)
                setUser(data)
            })
            }

            let interval = setInterval(() => {
                refreshToken().then((data) =>{ 
                    console.log("2nd-req-->",data)
                    setUser(data)
                      });
            }, 1000 * 29);
            return () => clearInterval(interval);
        },[])

    console.log("Inside Private Routes")
    console.log("user", user)
    return (
        user?<Outlet />:<Login2 />
    )
}



export default PrivateRoutes