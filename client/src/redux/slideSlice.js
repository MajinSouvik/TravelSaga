import {createSlice} from "@reduxjs/toolkit"

const slideSlice=createSlice({
    name:"slide",
    
    initialState:{
        isOpen:true
    },

    reducers:{
        openSlice:(state,action)=>{
            state.isOpen=action.payload
        }
    }
})

export const {openSlice}=slideSlice.actions
export default slideSlice.reducer

