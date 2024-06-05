import CloseIcon from '@mui/icons-material/Close';
import PopUpCreate from './PopUpCreate';
import { connect } from "react-redux"

function PopUpCreateClose(props){
    return(
        <div className='flex justify-around'>
            <PopUpCreate />
            <CloseIcon onClick={()=>props.setFLag(false)}/>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {flag:state.popUp.flag}
}

const mapDispatchToProps=(dispatch)=>{
    return {setFLag:(val)=>dispatch({type:"POPUP", flag:val})}
}
export default connect(mapStateToProps,mapDispatchToProps)(PopUpCreateClose)