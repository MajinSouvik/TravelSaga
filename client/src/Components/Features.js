import {useState} from "react"
import PopUpCreateClose from "./PopUpCreateClose"

function Features(props){
    const [showModal, setShowModal]=useState(false)

    return (
        <div className="flex flex-col place-self-start space-y-12 text-2xl mt-10">
            <button>Home</button>
            <button onClick={()=>setShowModal(true)}>Create</button>
            <button>Messenger</button>
            <button>Search</button>
            <button>ExploreX</button>
            <button>Shorts</button>
            <button>Notifications</button>
            {showModal && <PopUpCreateClose onClose={()=>setShowModal(false)} />}
        </div>
    )
}


export default Features