import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    
    initialState:{
        isLoggedIn: false,
    },

    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload);
        },

        logout:(state)=>{
            localStorage.clear()
            state.isLoggedIn=false
        }
    }
})

export const {login,logout}=authSlice.actions
export default authSlice.reducer