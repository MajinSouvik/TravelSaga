import {connect} from "react-redux"

function Features(props){
    return (
        <button onClick={()=>props.setFLag(!props.flag)} type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
    )
}

const mapStateToProps=(state)=>{
    return {flag:state.popUp.flag}
}

const mapDispatchToProps=(dispatch)=>{
    return {setFLag:(val)=>dispatch({type:"POPUP", flag:val})}
}
export default connect(mapStateToProps,mapDispatchToProps)(Features)