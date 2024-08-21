import {createSlice} from "@reduxjs/toolkit"

const imageSlice=createSlice({
    name:"image",
    
    initialState:{
        imageList:[],
        imageUpload:null
    },

    reducers:{
        uuploadImage:(state,action)=>{
            state.imageUpload=action.payload
        },

        updateImageList:(state,action)=>{
            state.imageList.push(action.payload)
        }
    }
})

export const {uuploadImage,updateImageList}=imageSlice.actions
export default imageSlice.reducer

