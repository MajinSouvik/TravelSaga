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



// const initialState ={
//     imageList:[],
//     imageUpload:null
// }

// const imageReducer = (state=initialState,action) => {
//     switch(action.type){
//         case 'UPLOAD_IMAGE':
//             return {...state,  imageUpload:action.upload }
//         case "UPDATE_LIST":
//             return {...state, imageList:[...state.imageList,action.update] }
//         default :
//             return state;
//     }
// }

// export default imageReducer