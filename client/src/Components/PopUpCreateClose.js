import CloseIcon from '@mui/icons-material/Close';
import PopUpCreate from './PopUpCreate';
import { connect } from "react-redux"

function PopUpCreateClose(props){
    return(
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <PopUpCreate />
            <CloseIcon onClick={()=>props.onClose()}/>
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