import {useState} from "react"
import PopUpCreateClose from "./PopUpCreateClose"
import {useDispatch} from "react-redux"
import {setFeed} from "../redux/feedSlice"
import axios from "axios"

axios.defaults.withCredentials = true;

function Features(props){
    const [showModal, setShowModal]=useState(false)
    const dispatch=useDispatch()

    const getFilteredReels=async()=>{
        const resp=await axios.get("http://localhost:8000/reels/filtered-reels/",
            {"params":{"place":"Dubai"}
        })
        dispatch(setFeed(resp.data.reels))
    }

    return (
        <div className="flex flex-col place-self-start space-y-12 text-2xl mt-10">
            <button>Home</button>
            <button onClick={()=>setShowModal(true)}>Create</button>
            <button>Messenger</button>
            <button>Search</button>
            <button onClick={()=>getFilteredReels()}>ExploreX</button>
            <button>Shorts</button>
            <button>Notifications</button>
            {showModal && <PopUpCreateClose onClose={()=>setShowModal(false)} />}
        </div>
    )
}


export default Features