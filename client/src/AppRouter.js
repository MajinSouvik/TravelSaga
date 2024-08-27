import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from "./App"
import Registration from "./Components/Registration"
import Login from "./Components/Login"
import Body from "./Components/Body"
import Shorts from "./Components/Shorts"
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
        element:<Registration />
      },

      {
        path:"/login",
        element:<Login />
      },
    
      isLoggedIn && {
        path:"/app",
        element:<App />,
        children:[
          {
            path:"reels",
            element:<Shorts />
          }
      ]
      }
    ])

    return(
        <RouterProvider router={routes} />
    )
}



export default AppRouter