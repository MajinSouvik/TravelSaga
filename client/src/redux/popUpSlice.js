import {createSlice} from "@reduxjs/toolkit"

const popUpSlice=createSlice({
    name:"popUp",
    
    initialState:{
        popUp:false
    },

    reducers:{
        setPopUp:(state,action)=>{
            state.popUp=action.payload
        }
    }
})

export const {setPopUp}=popUpSlice.actions
export default popUpSlice.reducer


