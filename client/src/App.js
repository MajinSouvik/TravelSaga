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
        const {data}=await axios.post("http://localhost:8000/",{},{withCredentials:true})  
        if(!data.status){
          removeCookie("login")
          navigate("/login")
        }
      }
    }    
    verifyUser()
  },[])

  return (
    <div>
      <h1>Hi {props.user}</h1>
      {props.popUp===false?(
        <div>
          <Header />
          <Features />
          <div className='flex justify-center'>
            <Feeds />
          </div>
        </div>
    ):(<PopUpCreateClose />)}
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {
    popUp:state.popUp.popUp,
    user:state.auth.user
  }
}

// const mapStateToProps = (state) =>{
//   return {
//       auth:state.auth.user
//   }
// }

export default connect(mapStateToProps)(App);
