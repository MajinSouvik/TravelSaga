import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {useSelector, useDispatch} from "react-redux"
import { addComment } from '../redux/commentSlice';
import axios from "axios"
import Post from './Post';
import {useState} from "react"
import Slide from './Slide';
axios.defaults.withCredentials = true;

function Feed(props){
    const comments=useSelector((store)=>store.comments.comments)
    const dispatch=useDispatch()
    const [showModal, setShowModal]=useState(false)
    const [post, setPost]=useState({})

    const handleComment=async()=>{
        const resp = await axios.post("http://localhost:8000/comments/upload",
            {"comment":comments, "postID":props.feedID},
        );
    }

    const getPost=async()=>{
        const resp=await axios.get("http://localhost:8000/posts/get-post/",
            {"params":{"ID":props.feedID}
        })
        // setReel(resp.data.post)
        setPost(resp.data.post)
        setShowModal(true)
    }

    return(
        <div className='my-6'>
            <div>
                <p>{props.name}</p>
                <p>{props.desc}</p>
                <Slide media={props.content} />
                <p>{props.place}</p>
            </div>

            <div className='flex justify-between'>
                <div className='space-x-3'>
                    <CommentIcon onClick={()=>getPost()}/>
                    <FavoriteBorderIcon />
                </div>
                
                <BookmarkBorderIcon />
            </div>

            <div>
                <textarea 
                    className="mt-2 flex justify-start w-full h-[30px] outline-none border-black border-b-2 pb-10" 
                    placeholder="Add Comment" 
                    onChange={(e)=>dispatch(addComment(e.target.value))}
                    value={props.comment}
                />
                <button onClick={()=>handleComment()}>post</button>
            </div>
            {
                showModal && 
                <Post 
                    onClose={()=>setShowModal(false)} 
                    post={post}
                />
            }
        </div>
    )
}

export default Feed