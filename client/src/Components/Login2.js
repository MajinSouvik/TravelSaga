import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../redux/authSlice"
import {setUser} from "../redux/userSlice"

function Login2(){
  const dispatch = useDispatch(); 
  const history = useNavigate();

  const usernameRef=useRef(null)
  const passwordRef=useRef(null)
  
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log("login-details-->**",data)
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
  sendRequest()
      .then((data) => {
        console.log(data)
        // localStorage.setItem("token",data.access_token)
        // localStorage.setItem("refresh",data.refresh_token)
        // localStorage.setItem("user_id",data.user.id)
        
        // localStorage.setItem("user",data.user.username)
        // console.log("BiggBoss-->",localStorage);
        // dispatch(login())
        // dispatch(setUser(data.user.username))
        // dispatch(setUserID(data.user.id))
      })
    //   .then(() => history("/"));
  };

  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
            <Typography variant="h2">Login</Typography>

            <TextField
                name="username"
                inputRef={usernameRef}
                variant="outlined"
                placeholder="Username"
                margin="normal"
            />

            <TextField
                name="password"
                inputRef={passwordRef}
                type="password"
                variant="outlined"
                placeholder="Password"
                margin="normal"
            />

            <Button variant="contained" type="submit">
                Login
            </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login2;