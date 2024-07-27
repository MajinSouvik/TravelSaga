import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    const history = useNavigate();
    const usernameRef=useRef(null)
    const passwordRef=useRef(null)
    const confirmPasswordRef=useRef(null)
    
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/register", {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/login"));
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

          <Typography variant="h2">Signup</Typography>
          
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

        <TextField
            name="confirmPassword"
            inputRef={confirmPasswordRef}
            type="password"
            variant="outlined"
            placeholder="Confirm Password"
            margin="normal"
          />

          <Button variant="contained" type="submit">
            Signup
          </Button>

        </Box>
      </form>
    </div>
  );
}

export default Register