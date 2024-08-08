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
        const getReels=async()=>{
            const reels=await axios.get("http://localhost:8000/reels/get-reels")
            dispatch(setFeed(reels.data.reels))
        }
        getReels()
    },[])


    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-4xl">Feeds</p>
            {feeds.map(feed=>{
                return (<Feed
                            feedID={feed._id}
                            image={feed.image} 
                            name={feed.name}
                            place={feed.place}
                        />)
            })}
        </div>
    )
}

export default Feeds