import React, { useState, useRef } from 'react';
import { TextField, Button, Avatar, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { CloudUpload } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {v4} from "uuid"
import {storage} from "../firebase"
import {API} from "../utils/constants"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

const FormContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
}));

const Input = styled('input')({
  display: 'none',
});

const Registration = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  const history = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);  // Store the file for upload
    }
  };

  const uploadImageToFirebase = async (imageFile) => {
    if (!imageFile) return;

    const storageRef = ref(storage, `upload/${imageFile.name+v4()}`);  // Reference to the file location in Firebase storage

    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to Firebase: ", error);
      return null;
    }
  };

  const sendRequest = async (imageURL) => {
    try {
      const res = await axios
      .post(API+"auth/register", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        profilePic: imageURL
      })

      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(file){
        const imageURL=await uploadImageToFirebase(file)
        if(imageURL){
            sendRequest(imageURL).then(() => history("/login"));
        }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center relative bg-[url('https://source.unsplash.com/1600x900/?travel')]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-60"></div>

      <FormContainer maxWidth="xs" className="relative z-10">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-gray-800">Join TravelSaga</Typography>
        
        {/* Username Field */}
        <TextField
          name="username"
          inputRef={usernameRef}
          placeholder="Username"
          label="Full Name"
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

        {/* Confirm Password Field */}
        <TextField
          name="confirmPassword"
          inputRef={confirmPasswordRef}
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
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

        {/* Profile Picture Upload */}
        <div className="flex items-center justify-center mb-4">
          <Avatar
            src={profilePic}
            sx={{ width: 80, height: 80, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
            className="border border-gray-300"
          />
        </div>
        <label htmlFor="upload-photo">
          <Input
            accept="image/*"
            id="upload-photo"
            type="file"
            onChange={handleImageChange}
          />
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUpload />}
            className="mb-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
          >
            Upload Profile Picture
          </Button>
        </label>

        {/* Sign Up Button */}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>

        {/* Login Link */}
        <Typography variant="body2" className="mt-4 text-gray-700">
          Already have an account? <a href="/logs" className="text-blue-500 hover:underline">Log in</a>
        </Typography>
      </FormContainer>
    </div>
  );
};

export default Registration;
