import {useEffect, useState} from "react"
import axios from "axios"
import Short from "./Short"
axios.defaults.withCredentials = true;

// function Shorts(){
//     const [reels, setReels]=useState([])

//     const getReels=async()=>{
//         const reelss=await axios.get("http://localhost:8000/reels/get-reels")
//         console.log("Reels in shorts-->",reels)
//         setReels(reelss.data.reels)
//     }

//     useEffect(()=>{
//         getReels()
//     },[])

//     return (
//         <div>
//             {reels.map(reel=>{
//                 return (<Short 
//                             reelID={reel._id}
//                             src={reel.url.url}
//                             name={reel.name}
//                             comment={reel.comments}
//                         />)
//             })}
//         </div>
//     )
// }

// export default Shorts



function Shorts() {
    const [activeReel, setActiveReel] = useState(0);
    const [reels, setReels]=useState([])

    const getReels=async()=>{
        const reelss=await axios.get("http://localhost:8000/reels/get-reels")
        console.log("Reels in shorts-->",reels)
        setReels(reelss.data.reels)
    }

    useEffect(()=>{
        getReels()
    },[])

    return (
        <div className="overflow-y-scroll h-screen snap-y snap-mandatory">
            {reels.map((reel, index) => (
                <div
                    key={reel.reelID}
                    className="snap-start"
                    onScroll={() => setActiveReel(index)}
                >
                    <Short
                        reelID={reel.reelID}
                        src={reel.src}
                        name={reel.name}
                        comment={reel.comment}
                        isActive={index === activeReel}
                    />
                </div>
            ))}
        </div>
    );
}

export default Shorts;
