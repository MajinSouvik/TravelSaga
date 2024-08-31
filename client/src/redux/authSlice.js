import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    
    initialState:{
        isLoggedIn: localStorage.getItem("token")?true:false
    },

    reducers:{
        login:(state)=>{
            state.isLoggedIn=true
        },

        logout:(state)=>{
            localStorage.clear()
            state.isLoggedIn=false
        }
    }
})

export const {login,logout}=authSlice.actions
export default authSlice.reducer