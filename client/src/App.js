import './App.css';
import Header from './Components/Header';
import Feeds from './Components/Feeds';
import Features from './Components/Features';
import { connect } from "react-redux"
import PopUpCreateClose from './Components/PopUpCreateClose';
import Register from './Components/Register';
import Login from './Components/Login';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react';
import axios from 'axios';

function App(props) {
  const [cookies,removeCookie] = useCookies([]);
  const navigate=useNavigate()

  useEffect(() =>{
    const verifyUser=async()=>{
      if(!cookies.login){
        navigate("/login")
      }else{
        console.log("here")
        const {data}=await axios.post("http://localhost:8000",{},{withCredentials:true})  
        console.log("Inside App error-->",data) 
        if(!data.status){
          removeCookie("login")
          navigate("/login")
        }
        console.log("ok")
      }
    }
    
    verifyUser()
  },[cookies,navigate])

  return(
    <div>
      <Feeds />
    </div>
)
  // return (
  //   <div>
  //     {props.popUp===false?(<div>
  //       <Header />
  //       <Features />
  //       <div className='flex justify-center'>
  //         <Feeds />
  //       </div>
  //     </div>):(<PopUpCreateClose />)}
  //   </div>
  // );
}

const mapStateToProps=(state)=>{
  return {popUp:state.popUp.popUp}
}

export default connect(mapStateToProps)(App);
