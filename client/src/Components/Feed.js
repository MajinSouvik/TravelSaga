// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Slide from "./Slide";
// import useMedia from "../hooks/useMedia";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CommentIcon from '@mui/icons-material/Comment';
// import SendIcon from '@mui/icons-material/Send';
// import Post from "./Post";

// axios.defaults.withCredentials = true;

// function Feed(props) {
//   const open = useSelector((store) => store.slide.isOpen);
//   const { images, videos } = useMedia(props.content);
//   const [showModal, setShowModal] = useState(false);
//   const [isLiked, setIsLiked] = useState(props.isLikedByUser);
//   const [likes, setLikes] = useState(props.likes);
//   const [post, setPost] = useState({});
//   const videoRefs = useRef([]);
//   const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
//   const observerRef = useRef(null);

//   const getPost = async () => {
//     const resp = await axios.get("http://localhost:8000/posts/get-post/", {
//       "params": { "ID": props.feedID }
//     });
//     setPost(resp.data.post);
//     setShowModal(true);
//   };

//   const likeDislikePost = async () => {
//     const resp = await axios.put("http://localhost:8000/posts/like-dislike/", {
//       postId: props.feedID
//     });

//     setIsLiked(resp.data.liked);
//     setLikes(resp.data.likes);
//   };

//   const handleVideoVisibility = useCallback((index, isVisible) => {
//     if (isVisible) {
//       setCurrentPlayingIndex(index);
//     } else if (currentPlayingIndex === index) {
//       setCurrentPlayingIndex(null);
//     }
//   }, [currentPlayingIndex]);

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         const index = Number(entry.target.dataset.index);
//         handleVideoVisibility(index, entry.isIntersecting);
//       });
//     }, { threshold: 0.5 });

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [handleVideoVisibility]);

//   useEffect(() => {
//     videoRefs.current.forEach((video, index) => {
//       if (video) {
//         if (index === currentPlayingIndex) {
//           video.play();
//         } else {
//           video.pause();
//         }
//         observerRef.current.observe(video);
//       }
//     });

//     return () => {
//       videoRefs.current.forEach((video) => {
//         if (video) observerRef.current.unobserve(video);
//       });
//     };
//   }, [currentPlayingIndex]);

//   useEffect(() => {
//     if (showModal) {
//       videoRefs.current.forEach(video => {
//         if (video) video.pause();
//       });
//       setCurrentPlayingIndex(null);
//       document.body.style.overflow = 'hidden';
//     } else {
//       if (currentPlayingIndex !== null && videoRefs.current[currentPlayingIndex]) {
//         videoRefs.current[currentPlayingIndex].play();
//       }
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [showModal, currentPlayingIndex]);

//   return (
//     <>
//       {/* Set a fixed width for each Feed component */}
//       <div className={`w-120 max-w-md mx-auto my-6 border rounded-lg shadow-lg overflow-hidden ${showModal ? 'filter blur-sm pointer-events-none' : ''}`}>
//         {/* Post Header */}
//         <div className="flex items-center p-4">
//           <img
//             className="h-12 w-12 rounded-full border border-gray-300"
//             src={props.avatar}
//             alt={props.name}
//           />
//           <div className="ml-4">
//             <h2 className="font-semibold">{props.name}</h2>
//             <p className="text-gray-500 text-sm">{props.place}</p>
//           </div>
//         </div>


//         {/* w-120 max-w-md */}

//         {/* max-w-lg */}
//         {/* Post Media */}
//         <div className="max-w-lg">
//           {open && (<Slide>
//             {[
//               ...images.map((image, index) => (
//                 <img
//                   key={`image-${index}`}
//                   src={image.url}
//                   alt={`Slide ${index + 1}`}
//                   className="object-cover w-full h-full"
//                 />
//               )),

//               ...videos.map((video, index) => (
//                 <video
//                   key={`video-${index}`}
//                   ref={el => videoRefs.current[index] = el}
//                   data-index={index}
//                   src={video.url}
//                   // muted
//                   loop
//                   playsInline
//                   className="object-cover w-full h-full"
//                 />
//               )),
//             ]}
//           </Slide>)}
//         </div>

//         {/* Post Actions */}
//         <div className="flex justify-between items-center p-4">
//           <div className="flex space-x-4">
//             <button className="text-gray-700 hover:text-red-500" onClick={() => likeDislikePost()}>
//               {isLiked ? (
//                 <FavoriteIcon style={{ color: 'red', cursor: 'pointer' }} />
//               ) : (
//                 <FavoriteBorderIcon style={{ color: 'gray', cursor: 'pointer' }} />
//               )}
//             </button>
//             <button className="text-gray-700 hover:text-blue-500">
//               <CommentIcon onClick={() => getPost()} />
//             </button>
//             <button className="text-gray-700 hover:text-yellow-500">
//               <SendIcon />
//             </button>
//           </div>
//           <button className="text-gray-700 hover:text-gray-900">
//             <i className="fas fa-bookmark"></i>
//           </button>
//         </div>

//         {/* Post Likes */}
//         <div className="px-4 py-2">
//           <p className="font-semibold">{likes} likes</p>
//         </div>

//         {/* Post Caption */}
//         <div className="px-4 pb-4">
//           <p>
//             <span className="font-semibold">{props.name}</span> {props.desc}
//           </p>
//           <p className="text-gray-500 text-sm mt-2">15 seconds ago</p>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && 
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <Post 
//             onClose={() => setShowModal(false)} 
//             images={images}
//             videos={videos}
//             feedID={props.feedID}
//           />
//         </div>
//       }
//     </>
//   );
// }

// export default Feed;

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Slide from "./Slide";
import useMedia from "../hooks/useMedia";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import Post from "./Post";

axios.defaults.withCredentials = true;

const FEED_WIDTH = 480; // Adjust this value as needed

function Feed(props) {
  const open = useSelector((store) => store.slide.isOpen);
  const { images, videos } = useMedia(props.content);
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(props.isLikedByUser);
  const [likes, setLikes] = useState(props.likes);
  const [post, setPost] = useState({});
  const videoRefs = useRef([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const observerRef = useRef(null);

  const getPost = async () => {
    const resp = await axios.get("http://localhost:8000/posts/get-post/", {
      "params": { "ID": props.feedID }
    });
    setPost(resp.data.post);
    setShowModal(true);
  };

  const likeDislikePost = async () => {
    const resp = await axios.put("http://localhost:8000/posts/like-dislike/", {
      postId: props.feedID
    });

    setIsLiked(resp.data.liked);
    setLikes(resp.data.likes);
  };

  const handleVideoVisibility = useCallback((index, isVisible) => {
    if (isVisible) {
      setCurrentPlayingIndex(index);
    } else if (currentPlayingIndex === index) {
      setCurrentPlayingIndex(null);
    }
  }, [currentPlayingIndex]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        handleVideoVisibility(index, entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleVideoVisibility]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentPlayingIndex) {
          video.play();
        } else {
          video.pause();
        }
        observerRef.current.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observerRef.current.unobserve(video);
      });
    };
  }, [currentPlayingIndex]);

  useEffect(() => {
    if (showModal) {
      videoRefs.current.forEach(video => {
        if (video) video.pause();
      });
      setCurrentPlayingIndex(null);
      document.body.style.overflow = 'hidden';
    } else {
      if (currentPlayingIndex !== null && videoRefs.current[currentPlayingIndex]) {
        videoRefs.current[currentPlayingIndex].play();
      }
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, currentPlayingIndex]);

  return (
    <div style={{ width: `${FEED_WIDTH}px`, margin: '24px auto' }}>
      <div className={`border rounded-lg shadow-lg overflow-hidden ${showModal ? 'filter blur-sm pointer-events-none' : ''}`}>
        {/* Post Header */}
        <div className="flex items-center p-4">
          <img
            className="h-12 w-12 rounded-full border border-gray-300"
            src={props.avatar}
            alt={props.name}
          />
          <div className="ml-4">
            <h2 className="font-semibold">{props.name}</h2>
            <p className="text-gray-500 text-sm">{props.place}</p>
          </div>
        </div>

        {/* Post Media */}
        <div style={{ width: `${FEED_WIDTH}px`, height: `${FEED_WIDTH}px` }}>
          {open && (
            <Slide feedWidth={FEED_WIDTH}>
              {[
                ...images.map((image, index) => (
                  <img
                    key={`image-${index}`}
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    style={{ width: `${FEED_WIDTH}px`, height: `${FEED_WIDTH}px`, objectFit: 'cover' }}
                  />
                )),
                ...videos.map((video, index) => (
                  <video
                    key={`video-${index}`}
                    ref={el => videoRefs.current[index] = el}
                    data-index={index}
                    src={video.url}
                    loop
                    playsInline
                    style={{ width: `${FEED_WIDTH}px`, height: `${FEED_WIDTH}px`, objectFit: 'cover' }}
                  />
                )),
              ]}
            </Slide>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex justify-between items-center p-4">
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-red-500" onClick={likeDislikePost}>
              {isLiked ? (
                <FavoriteIcon style={{ color: 'red', cursor: 'pointer' }} />
              ) : (
                <FavoriteBorderIcon style={{ color: 'gray', cursor: 'pointer' }} />
              )}
            </button>
            <button className="text-gray-700 hover:text-blue-500" onClick={getPost}>
              <CommentIcon />
            </button>
            <button className="text-gray-700 hover:text-yellow-500">
              <SendIcon />
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-900">
            <i className="fas fa-bookmark"></i>
          </button>
        </div>

        {/* Post Likes */}
        <div className="px-4 py-2">
          <p className="font-semibold">{likes} likes</p>
        </div>

        {/* Post Caption */}
        <div className="px-4 pb-4">
          <p>
            <span className="font-semibold">{props.name}</span> {props.desc}
          </p>
          <p className="text-gray-500 text-sm mt-2">15 seconds ago</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && 
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Post 
            onClose={() => setShowModal(false)} 
            images={images}
            videos={videos}
            feedID={props.feedID}
          />
        </div>
      }
    </div>
  );
}

export default Feed;

