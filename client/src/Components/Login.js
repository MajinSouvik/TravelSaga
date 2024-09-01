// import React, { useRef, useState } from 'react';
// import { TextField, Button, Typography, Container } from '@mui/material';
// import { styled } from '@mui/system';
// import axios from "axios";
// import {useDispatch} from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {login} from "../redux/authSlice"

// const FormContainer = styled(Container)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   backgroundColor: 'rgba(255, 255, 255, 0.85)',
//   padding: '2rem',
//   borderRadius: '1rem',
//   boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
// }));

// const Login = () => {
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const history = useNavigate();
//   const dispatch = useDispatch(); 
//   const [errorMessage, setErrorMessage] = useState("");

//   const sendRequest = async () => {
//     const res = await axios
//       .post("http://localhost:8000/auth/login", {
//         username: usernameRef.current.value,
//         password: passwordRef.current.value,
//       })
//       .catch((err) => {
//         console.log(err)
//         setErrorMessage("Invalid Username or Password!")
//     });

//     const data = await res.data;
//     // localStorage.setItem('token',data.signature)
//     console.log("login-details-->**",data)
//     return data;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     sendRequest()
//         .then((data) =>dispatch(login(data.signature)))
//         .then(() => history("/app"));
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-cover bg-center relative bg-[url('https://source.unsplash.com/1600x900/?nature')]">
//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-500 opacity-60"></div>

//       <FormContainer maxWidth="xs" className="relative z-10">
//         <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-800">Welcome Back</Typography>

//         {/* Error Message */}
//         {errorMessage && (
//           <Typography variant="body2" className="text-red-600 mb-4">
//             {errorMessage}
//           </Typography>
//         )}

//         {/* Username Field */}
//         <TextField
//           name="username"
//           inputRef={usernameRef}
//           placeholder="Username"
//           label="Username"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           className="rounded-lg bg-white shadow-sm"
//           InputProps={{
//             style: {
//               borderRadius: '8px',
//             },
//           }}
//         />

//         {/* Password Field */}
//         <TextField
//           name="password"
//           inputRef={passwordRef}
//           label="Password"
//           type="password"
//           placeholder="Password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           className="rounded-lg bg-white shadow-sm"
//           InputProps={{
//             style: {
//               borderRadius: '8px',
//             },
//           }}
//         />

//         {/* Login Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
//           onClick={handleLogin}
//         >
//           Log In
//         </Button>

//         {/* Sign Up Link */}
//         <Typography variant="body2" className="mt-4 text-gray-700">
//           Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
//         </Typography>
//       </FormContainer>
//     </div>
//   );
// };

// export default Login;

import React, { useRef, useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const FormContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
}));

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [errorMessage, setErrorMessage] = useState("");

  const sendRequest = async () => {
    try {
      const res = await axios.post("https://travelsaga-backend.vercel.app/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      const data = await res.data;
      console.log("login-details-->**", data);

      // Return data only if the response is successful
      return data;
    } catch (err) {
      console.log(err);
      setErrorMessage("Invalid Username or Password!");
      throw new Error("Login failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest();
      if (data) {
        dispatch(login(data.signature));
        navigate("/app");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center relative bg-[url('https://source.unsplash.com/1600x900/?nature')]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-500 opacity-60"></div>

      <FormContainer maxWidth="xs" className="relative z-10">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-800">Welcome Back</Typography>

        {/* Error Message */}
        {errorMessage && (
          <Typography variant="body2" className="text-red-600 mb-4">
            {errorMessage}
          </Typography>
        )}

        {/* Username Field */}
        <TextField
          name="username"
          inputRef={usernameRef}
          placeholder="Username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          className="rounded-lg bg-white shadow-sm"
          InputProps={{
            style: {
              borderRadius: '8px',
            },
          }}
        />

        {/* Password Field */}
        <TextField
          name="password"
          inputRef={passwordRef}
          label="Password"
          type="password"
          placeholder="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          className="rounded-lg bg-white shadow-sm"
          InputProps={{
            style: {
              borderRadius: '8px',
            },
          }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          onClick={handleLogin}
        >
          Log In
        </Button>

        {/* Sign Up Link */}
        <Typography variant="body2" className="mt-4 text-gray-700">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </Typography>
      </FormContainer>
    </div>
  );
};

export default Login;

