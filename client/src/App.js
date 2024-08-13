import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import Features from "./Components/Features"
import Feeds from "./Components/Feeds"
import SlideSearch from "./Components/SlideSearch"
import axios from "axios"
import {setUser} from "./redux/userSlice"
axios.defaults.withCredentials = true;

let firstRender=true

function App() {
    const dispatch=useDispatch()
    const user=useSelector((store)=>store.user.user)
    
    const sendRequest = async()=>{
        const resp=await axios.get("http://localhost:8000/user",{
        }).catch(err=>console.log(err))

        const data=resp.data
        return data
    }

    const refreshToken=async()=>{
        const resp=await axios.get("http://localhost:8000/refresh",{
        }).catch(err=>console.log(err))

        const data=resp.data
        return data
    }

    useEffect(()=>{
      if(firstRender){
        firstRender=false
        sendRequest().then((data)=>{
          dispatch(setUser(data))
        }).catch(err=>dispatch(setUser(null)))
      }

      let interval = setInterval(() => {
        refreshToken().then((data) =>{ 
          dispatch(setUser(data))
          }).catch(err=>dispatch(setUser(null)))
        }, 1000 * 29);
        return () => clearInterval(interval);
    },[])

  
  if(user===null) return <h1>Loading..</h1>

  return (
    <div>
      {user && <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1>Hi {user.username}</h1>
          <h1 className='text-4xl mt-4'>TravelSaga</h1>
          <Features />
        </div>

        <Feeds />
        <SlideSearch />
        <h1>G</h1>
      </div>}
    </div>
  );
}

export default App;
