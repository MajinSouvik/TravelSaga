import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../redux/authSlice"

function Login(){
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
    localStorage.setItem('token',data.signature)
    console.log("login-details-->**",data)
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest()
        .then(() =>dispatch(login()))
        .then(() => history("/app"));
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

export default Login;