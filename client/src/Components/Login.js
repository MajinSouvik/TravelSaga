import { useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"
import {connect} from "react-redux"

function Login(props){
    const navigate=useNavigate()
    const [cookies]=useCookies([])
    const [values, setValues] = useState({ username: "", password: "" });

    useEffect(()=>{
        if(cookies.login){
            navigate("/")
        }
    },[cookies, navigate])  


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post("http://localhost:8000/login",{
               ...values
            },{ withCredentials: true });
            if(resp.data.status){
                props.setUser(values.username)
                navigate("/")
            }
        } catch (err) {
          console.log(err);
        }
      };


    return(
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        auth:state.auth.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {setUser:(user)=>dispatch({type:"SET_USER", payload:user})}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)