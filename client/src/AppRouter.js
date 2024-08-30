// import {createBrowserRouter,RouterProvider} from "react-router-dom"
// import App from "./App"
// import Registration from "./Components/Registration"
// import Login from "./Components/Login"
// import Body from "./Components/Body"
// import Shorts from "./Components/Shorts"
// import {useSelector} from "react-redux"

// function AppRouter(){
//     const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn)
  
//     const routes=createBrowserRouter([
//       {
//         path:"/",
//         element:<Body />
//       },

//       {
//         path:"/signup",
//         element:<Registration />
//       },

//       {
//         path:"/login",
//         element:<Login />
//       },
    
//       isLoggedIn && {
//         path:"/app",
//         element:<App />,
//         children:[
//           {
//             path:"reels",
//             element:<Shorts />
//           }
//       ]
//       }
//     ])

//     return(
//         <RouterProvider router={routes} />
//     )
// }



// export default AppRouter

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Body from "./Components/Body";
import Shorts from "./Components/Shorts";
import { useSelector } from "react-redux";

// Wrapper component for conditional rendering
const DefaultRoute = () => {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    console.log("token-->", isLoggedIn)
    console.log("localStorage-->", localStorage)
    // Redirect to '/app' if logged in, otherwise to '/login'
    return isLoggedIn ? <App /> : <Login />;
};

function AppRouter() {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <DefaultRoute />,
            children: [
                {
                    path: "signup",
                    element: <Registration />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "app",
                    element: isLoggedIn ? <App /> : <Navigate to="/login" />,
                    children: [
                        {
                            path: "reels",
                            element: isLoggedIn ? <Shorts /> : <Navigate to="/login" />,
                        },
                    ],
                },
            ],
        },
        {
            path: "*",
            element: <Navigate to={isLoggedIn ? "/app" : "/login"} />,
        },
    ]);

    return <RouterProvider router={routes} />;
}

export default AppRouter;

