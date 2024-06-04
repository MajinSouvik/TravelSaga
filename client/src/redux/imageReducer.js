const initialState ={
    imageList:[],
    imageUpload:null
}

const imageReducer = (state=initialState,action) => {
    switch(action.type){
        case 'UPLOAD_IMAGE':
            return {...state,  imageUpload:action.upload }
        case "UPDATE_LIST":
            return {...state, imageList:[...state.imageList,action.update] }
        default :
            return state;
    }
}

export default imageReducer