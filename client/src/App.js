// import {useEffect} from "react";
// import {useSelector, useDispatch} from "react-redux"
// import Features from "./Components/Features"
// import Feeds from "./Components/Feeds"
// import SlideSearch from "./Components/SlideSearch"
// import axios from "axios"
// import { Outlet } from "react-router-dom";
// import {setUser} from "./redux/userSlice"
// axios.defaults.withCredentials = true;

// let firstRender=true

// function App() {
//     const dispatch=useDispatch()
//     const user=useSelector((store)=>store.user.user)
//     const feedOrReel=useSelector((store)=>store.feedReel.feedReel)
    
//     const sendRequest = async()=>{
//         const resp=await axios.get("http://localhost:8000/user",{
//         }).catch(err=>console.log(err))

//         const data=resp.data
//         return data
//     }

//     const refreshToken=async()=>{
//         const resp=await axios.get("http://localhost:8000/auth/refresh",{
//         }).catch(err=>console.log(err))

//         const data=resp.data
//         return data
//     }

//     useEffect(()=>{
//       if(firstRender){
//         firstRender=false
//         sendRequest().then((data)=>{
//           dispatch(setUser(data))
//         }).catch(err=>dispatch(setUser(null)))
//       }

//       let interval = setInterval(() => {
//         refreshToken().then((data) =>{ 
//           dispatch(setUser(data))
//           }).catch(err=>dispatch(setUser(null)))
//         }, 1000 * 29);
//         return () => clearInterval(interval);
//     },[])

  
//   if(user===null) return <h1>Loading..</h1>

//   return (
//     <div>
//       {user && <div className='flex justify-between'>
//         <div className='flex flex-col'>
//           <h1>Hi {user.username}</h1>
//           <h1 className='text-4xl mt-4'>TravelSaga</h1>
//           <Features />
//         </div>

//         {feedOrReel? <Feeds />:<Outlet />}
//         <SlideSearch />
//         <h1>G</h1>
//       </div>}
//     </div>
//   );
// }

// export default App;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Features from "./Components/Features";
import Feeds from "./Components/Feeds";
import SlideSearch from "./Components/SlideSearch";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { setUser } from "./redux/userSlice";
axios.defaults.withCredentials = true;

let firstRender = true;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const feedOrReel = useSelector((store) => store.feedReel.feedReel);

  const sendRequest = async () => {
    const resp = await axios.get("http://localhost:8000/user").catch((err) =>
      console.log(err)
    );

    const data = resp.data;
    return data;
  };

  const refreshToken = async () => {
    const resp = await axios.get("http://localhost:8000/auth/refresh").catch((err) =>
      console.log(err)
    );

    const data = resp.data;
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest()
        .then((data) => {
          dispatch(setUser(data));
        })
        .catch((err) => dispatch(setUser(null)));
    }

    let interval = setInterval(() => {
      refreshToken()
        .then((data) => {
          dispatch(setUser(data));
        })
        .catch((err) => dispatch(setUser(null)));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);

  

  if (user === null) return <h1>Loading..</h1>;

  return (
    <div>
      {user && (
        <div className="flex justify-between items-start p-4">
          <div className="flex flex-col">
            {/* Profile and Greeting Section */}
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-lg"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  Hi, {user.username}!
                </h1>
                <h1 className="text-4xl mt-2 text-blue-600 font-bold">
                  TravelSaga
                </h1>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-6">
              <Features />
            </div>
          </div>

          {/* Feed or Reel Display */}
          <div className="flex-1 mx-6">
            {feedOrReel ? <Feeds /> : <Outlet />}
          </div>

          {/* Slide Search Section */}
          <div className="flex-none w-64">
            <SlideSearch />
          </div>
        </div>
      )}
    </div>
  );

  
}

export default App;

