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

// Component for handling conditional rendering based on authentication
const DefaultRoute = () => {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    return isLoggedIn ? <Navigate to="/app" /> : <Navigate to="/login" />;
};

function AppRouter() {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <DefaultRoute />,  // Redirect to /app or /login based on authentication
        },
        {
            path: "/signup",
            element: <Registration />,  // Directly accessible
        },
        {
            path: "/login",
            element: <Login />,  // Directly accessible
        },
        {
            path: "/app",
            element: isLoggedIn ? <App /> : <Navigate to="/login" />,  // Conditional based on login status
            children: [
                {
                    path: "reels",
                    element: isLoggedIn ? <Shorts /> : <Navigate to="/login" />,  // Protected route
                },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/" />,  // Catch-all route redirects to root
        },
    ]);

    return <RouterProvider router={routes} />;
}

export default AppRouter;


