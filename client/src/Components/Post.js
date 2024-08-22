import CloseIcon from '@mui/icons-material/Close';
import PostComments from './PostComments';
import Slide from './Slide';

function Post({images, videos, feedID, onClose}){
    return(
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" >
        <CloseIcon onClick={()=>onClose()} />
    
        {/* <div className='flex'>
            <img src={props.post.image} />
            <PostComments Comments={[props.post.comments]} />
        </div> */}
        
            <div className="flex max-w-lg">
                <Slide>
                {[
                    ...images.map((image, index) => (
                    <img
                        key={`image-${index}`}
                        src={image.url}
                        alt={`Slide ${index + 1}`}
                        className="object-cover w-full h-full"
                    />
                    )),

                    ...videos.map((video, index) => (
                    <video
                        key={`video-${index}`}
                        src={video.url}
                        autoPlay
                        // muted
                        className="object-cover w-full h-full"
                    />
                    )),
                ]}
                </Slide>
                
                <PostComments />
            </div>
      
    </div>)
} 

export default Post