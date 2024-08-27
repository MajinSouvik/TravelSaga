import {useState} from "react"
import PopUpCreateClose from "./PopUpCreateClose"
import {useDispatch, useSelector} from "react-redux"
import {setFeed} from "../redux/feedSlice"
import {setReels} from "../redux/reelSlice"
import {setFeedReel} from "../redux/feedReelSlice"
import { useNavigate } from "react-router-dom";
import {openSlice} from "../redux/slideSlice"

import axios from "axios"
axios.defaults.withCredentials = true;

function Features(props){
    const [showModal, setShowModal]=useState(false)
    // const feedOrReel=useSelector((store)=>store.feedReel.feedReel) 
    const dispatch=useDispatch()
    const history = useNavigate();

    const getFilteredReels=async()=>{
        const resp=await axios.get("http://localhost:8000/reels/filtered-reels/",
            {"params":{"place":"Dubai"}
        })
        dispatch(setFeed(resp.data.reels))
    }

    const getReels=async()=>{
        dispatch(setFeedReel(false))
        history("/app/reels")
        // const resp=await axios.get("http://localhost:8000/reels/get-reels/")
    }

    const getFeeds=()=>{
        dispatch(setFeedReel(true))
        history("/app")
    }

    const change=()=>{
        setShowModal(true)
        dispatch(openSlice(false))
    }

    return (
        <div className="flex flex-col place-self-start space-y-12 text-2xl mt-10">
            <button onClick={()=>getFeeds()}>Home</button>
            <button onClick={()=>change()}>Create</button>
            <button>Messenger</button>
            <button>Search</button>
            <button onClick={()=>getFilteredReels()}>ExploreX</button>
            <button onClick={()=>getReels()}>Shorts</button>
            <button>Notifications</button>
            {showModal && <PopUpCreateClose onClose={()=>setShowModal(false)} />}
        </div>
    )
}


export default Features