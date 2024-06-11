const initialState ={
    feeds:[]
}

const feedReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_FEED':
            return {...state, feeds:action.payload}
        default:
            return state
    }
}

export default feedReducer