import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from "./App"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Body from "./Components/Body"
import {useSelector} from "react-redux"

function AppRouter(){
    const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn)
  
    const routes=createBrowserRouter([
      {
        path:"/",
        element:<Body />
      },

      {
        path:"/signup",
        element:<Register />
      },
    
      {
        path:"/login",
        element:<Login />
      },
    
      isLoggedIn && {
        path:"/app",
        element:<App />
      }
    ])

    return(
        <RouterProvider router={routes} />
    )
}



export default AppRouter