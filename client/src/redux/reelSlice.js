import {createSlice} from "@reduxjs/toolkit"

const reelSlice=createSlice({
    name:"reels",
    
    initialState:{
        reels:[]
    },

    reducers:{
        setReels:(state,action)=>{
            state.reels=action.payload
        }
    }
})

export const {setReels}=reelSlice.actions
export default reelSlice.reducer

