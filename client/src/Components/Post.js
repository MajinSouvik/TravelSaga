import CloseIcon from '@mui/icons-material/Close';
import PostComments from './PostComments';

function Post(props){
    return(
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" onClick={()=>props.onClose()}>
        <CloseIcon onClick={()=>props.onClose()} />
    
        <div className='flex'>
            <img src={props.post.image} />
            <PostComments Comments={[props.post.comments]} />
        </div>
    </div>)
} 

export default Post