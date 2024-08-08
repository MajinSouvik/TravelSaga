import {createSlice} from "@reduxjs/toolkit"

const feedSlice=createSlice({
    name:"feeds",
    
    initialState:{
        feeds:[]
    },

    reducers:{
        setFeed:(state,action)=>{
            state.feeds=action.payload
        }
    }
})

export const {setFeed}=feedSlice.actions
export default feedSlice.reducer

