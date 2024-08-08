import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    
    initialState:{
        isLoggedIn: localStorage.getItem("token")?true:false
    },

    reducers:{
        login:(state)=>{
            state.isLoggedIn=true
        }
    }
})

export const {login}=authSlice.actions
export default authSlice.reducer