import React, { useRef, useEffect ,useState} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from "axios";
axios.defaults.withCredentials = true;

function Short({ reelID, src, name, comment, inView, onCommentClick,onOpenCommentModal }) {
  console.log("reelIdd-->" ,reelID)
  const videoRef = useRef(null);
  const [isLiked, setIsLiked]=useState(false)
  const [likes, setLikes]=useState(0)

  useEffect(() => {
    
    if (inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  const likeDislikeReel=async()=>{
    const resp = await axios.put("https://travelsaga-frontend.vercel.app/reels/like-dislike/", {
      reelId: reelID
    });

    
    setIsLiked(resp.data.liked)
    setLikes(resp.data.likes)
  }

  return (
    <div className="reel-container w-full h-[calc(100vh-56px)] max-w-[400px] mx-auto relative flex">
      {/* Video Section */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        // muted
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Action Bar Section */}
      <div className="action-bar absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-4">
      <button className="text-gray-700 hover:text-red-500" onClick={()=>likeDislikeReel()}>
            {isLiked ? (
            <FavoriteIcon style={{ color: 'red', cursor: 'pointer' }} />
      ) : (
        <FavoriteBorderIcon style={{ color: 'gray', cursor: 'pointer' }} />
      )}
            </button>{likes}
        <button className="text-white hover:text-blue-500" onClick={() => onOpenCommentModal(reelID)}>
          <CommentIcon />
        </button>
        <button className="text-white hover:text-yellow-500">
          <BookmarkBorderIcon />
        </button>
      </div>

      {/* Video Info Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
        <p className="font-bold">{name}</p>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
}

export default Short;


