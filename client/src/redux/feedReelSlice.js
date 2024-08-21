import {createSlice} from "@reduxjs/toolkit"

const feedReelSlice=createSlice({
    name:"feedReel",
    
    initialState:{
        feedReel:true
    },

    reducers:{
        setFeedReel:(state,action)=>{
            state.feedReel=action.payload
        }
    }
})

export const {setFeedReel}=feedReelSlice.actions
export default feedReelSlice.reducer

