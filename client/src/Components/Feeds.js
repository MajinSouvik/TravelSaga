import Feed from "./Feed"
import {useSelector} from "react-redux"
import axios from "axios"
import useGetPosts from "../hooks/useGetPosts"
axios.defaults.withCredentials = true;

function Feeds(){
    const feeds=useSelector((store)=>store.feed.feeds)
    useGetPosts()
    
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

