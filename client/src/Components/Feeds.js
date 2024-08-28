import Feed from "./Feed"
import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {setFeed} from "../redux/feedSlice"
import axios from "axios"
axios.defaults.withCredentials = true;

function Feeds(){
    const dispatch=useDispatch()
    const feeds=useSelector((store)=>store.feed.feeds)
    
    useEffect(() =>{
        const getPosts=async()=>{
            const posts=await axios.get("http://localhost:8000/posts/get-posts")
            console.log("posts in feeds-->", posts)
            dispatch(setFeed(posts.data.posts))
        }
        getPosts()
    },[])


    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-4xl">Feeds</p>
            {feeds.length!==0 && feeds.map(feed=>{
                return (<Feed
                            feedID={feed._id}
                            isLikedByUser={feed.isLikedByUser}
                            likes={feed.likes.length}
                            content={feed.files} 
                            avatar={feed.postedBy.profilePic}
                            name={feed.name}
                            place={feed.place}
                            desc={feed.description}
                        />)
            })}
        </div>
    )
}

export default Feeds

