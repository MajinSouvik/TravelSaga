import {useState, useEffect} from "react";
import {useSelector} from "react-redux"
import Features from "./Components/Features"
import Feeds from "./Components/Feeds"
import SlideSearch from "./Components/SlideSearch"
import axios from "axios"
axios.defaults.withCredentials = true;

let firstRender=true

function App() {
    const [user, setUser]=useState(null)
    
    const sendRequest = async()=>{
        const resp=await axios.get("http://localhost:8000/user",{
            withCredentials: true
        }).catch(err=>console.log(err))

        const data=resp.data
        return data
    }

    const refreshToken=async()=>{
        const resp=await axios.get("http://localhost:8000/refresh",{
            withCredentials: true
        }).catch(err=>console.log(err))

        const data=resp.data
        return data
    }

    useEffect(()=>{
      if(firstRender){
        firstRender=false
        sendRequest().then((data)=>{
          setUser(data)
        })
      }

      let interval = setInterval(() => {
        refreshToken().then((data) =>{ 
          setUser(data)
          })
        }, 1000 * 29);
        return () => clearInterval(interval);
        },[])

  return (
    <div>
      {user && <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1>Hi </h1>
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
