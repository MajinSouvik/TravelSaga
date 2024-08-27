import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setFeed} from "../redux/feedSlice"
import axios from "axios"
axios.defaults.withCredentials = true;

function usePosts(){
    const dispatch=useDispatch()

    useEffect(()=>{
        console.log("posts called !!")
        const getPosts=async()=>{
            const posts=await axios.get("http://localhost:8000/posts/get-posts")
            console.log("posts in feeds-->", posts)
            dispatch(setFeed(posts.data.posts))
        }
        getPosts()
    },[])
}

export default usePosts