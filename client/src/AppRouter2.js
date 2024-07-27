import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from "./App"

import Register from "./Components/Register"
import Login2 from "./Components/Login2"
import PrivateRoutes from "./Components/PrivateRoutes"

function AppRouter(){
    return(
        <RouterProvider router={routes} />
    )
}

  const routes=createBrowserRouter([
      {
        path:"/signup",
        element:<Register />
      },

      {
        path:"/login",
        element:<Login2 />
      },

      {
        path:"/",
        element:<PrivateRoutes />,

        children:[
          {
            path:"/",
            element:<App />
          },

        ]

      }
  ])

  
export default AppRouter