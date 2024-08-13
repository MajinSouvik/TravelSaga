import CloseIcon from '@mui/icons-material/Close';
import PopUpCreate from './PopUpCreate';
import PopUpCreate2 from './PopUpCreate2';

function PopUpCreateClose(props){
    return(
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            {/* <PopUpCreate /> */}
            <PopUpCreate2 />
            <CloseIcon onClick={()=>props.onClose()}/>
        </div>
    )
}

export default PopUpCreateClose