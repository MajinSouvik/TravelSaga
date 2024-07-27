import Feed from "./Feed"
import {useEffect} from "react"
import {connect} from "react-redux"
import axios from "axios"

function Feeds(props){
    useEffect(() =>{
        const getReels=async()=>{
            const reels=await axios.get("http://localhost:8000/reels/get-reels")
            props.setFeeds(reels.data.reels)
        }
        getReels()
    },[])


    return (
        <div className="flex flex-col justify-center items-center ">
            <p className="text-4xl">Feeds</p>
            {props.feeds.map(feed=>{
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

const mapStateToProps=(state)=>{
    return {feeds:state.feeds.feeds}
}

const mapDispatchToProps=(dispatch)=>{
    return {setFeeds:(reels)=>dispatch({type:"SET_FEED", payload:reels})}
}

export default connect(mapStateToProps,mapDispatchToProps)(Feeds)