const initialState={
    popUp:false
}

const popUpReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'POPUP':
            return {...state, popUp:action.flag }
        default:
            return state
    }
}

export default popUpReducer